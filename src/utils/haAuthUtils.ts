/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Home Assistant OAuth Helpers (IndieAuth with PKCE)
 */

export function generateRandomString(length: number = 64): string {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let text = '';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(new Uint8Array(digest));
}

function base64UrlEncode(a: Uint8Array): string {
  return btoa(String.fromCharCode.apply(null, Array.from(a)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function loginToHomeAssistant(haUrl: string) {
  const baseUrl = haUrl.replace(/\/api\/mcp\/?$/, '').replace(/\/$/, '');
  const clientId = window.location.origin;
  const redirectUri = `${window.location.origin}${window.location.pathname}`;
  const state = generateRandomString(16);
  const verifier = generateRandomString(64);
  const challenge = await generateCodeChallenge(verifier);

  // Store state and verifier for callback
  localStorage.setItem('curio_ha_oauth_state_pending', state);
  localStorage.setItem('curio_ha_oauth_verifier_pending', verifier);
  localStorage.setItem('curio_ha_auth_url_pending', haUrl);

  const authUrl = new URL(`${baseUrl}/auth/authorize`);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('code_challenge', challenge);
  authUrl.searchParams.set('code_challenge_method', 'S256');

  window.location.href = authUrl.toString();
}

export async function exchangeCodeForToken(haUrl: string, code: string, verifier: string): Promise<{ access_token: string, refresh_token?: string, expires_in?: number }> {
  const baseUrl = haUrl.replace(/\/api\/mcp\/?$/, '').replace(/\/$/, '');
  const clientId = window.location.origin;
  const redirectUri = `${window.location.origin}${window.location.pathname}`;

  const response = await fetch(`${baseUrl}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: clientId,
      redirect_uri: redirectUri,
      code_verifier: verifier,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error(`HA OAuth exchange failed (${response.status}):`, err);
    throw new Error(`Failed to exchange code (${response.status}): ${err}`);
  }

  return response.json();
}

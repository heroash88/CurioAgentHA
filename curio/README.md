# Curio Robot

A voice-powered AI assistant that runs as a Home Assistant add-on. Uses Google's Gemini Live API for real-time voice conversation with 35+ visual response cards.

## Installation

1. In Home Assistant, go to **Settings > Add-ons > Add-on Store**
2. Click the **three-dot menu** (top right) > **Repositories**
3. Paste `https://github.com/heroash88/CurioAgentHA` and click **Add**
4. Find **Curio Robot** in the store and click **Install**
5. After install, toggle **Show in sidebar** for quick access
6. Click **Start**, then **Open Web UI**

The add-on uses ingress -- it appears directly inside the Home Assistant UI. When running as an add-on, Curio automatically connects to your Home Assistant instance (no manual token or login needed).

## Direct Access (for Google Sign-In)

Curio is also accessible directly at `http://<your-ha-ip>:8099`. This is useful for:

- **Google sign-in** (Calendar, Tasks, Photos) -- popups don't work through HA ingress
- Accessing Curio from other devices on your network
- Kiosk/tablet setups

The port can be changed in the add-on configuration. After signing into Google via direct access, the tokens persist -- so ingress will have access to Google services too.

## Microphone and Camera

Mic and camera require a "secure context" (HTTPS or localhost). This means:

- **HA with HTTPS** (Nabu Casa, reverse proxy, etc.) -- mic/camera work via direct access at `https://<your-domain>:8099`
- **Plain HTTP** -- browsers block mic/camera. To work around this, open `chrome://flags/#unsafely-treat-insecure-origin-as-secure` in Chrome, add `http://<your-ha-ip>:8099`, and restart Chrome
- **HA ingress** -- mic/camera don't work in the ingress iframe (HA limitation). Use direct access instead

For the best experience on a kiosk/tablet, access Curio directly at `http(s)://<your-ha-ip>:8099` rather than through the HA sidebar.

## Requirements

- A Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey) (entered in Curio's settings after first launch)

## Configuration

| Option | Default | Description |
|--------|---------|-------------|
| `port` | `8099` | Port for direct web access (change if 8099 conflicts) |
| `log_level` | `info` | Logging verbosity |

## Updating

When a new version is available, go to **Settings > Add-ons > Curio Robot** and click **Rebuild**.

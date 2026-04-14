/**
 * Utility functions for Home Assistant authentication in Add-on / Ingress environments.
 */

/**
 * Detects if the application is running inside a Home Assistant Ingress.
 * Ingress URLs usually contain '/api/hassio_ingress/'
 */
export const isHomeAssistantIngress = (): boolean => {
    return window.location.pathname.includes('/api/hassio_ingress/');
};

/**
 * Resolves the URL for the Home Assistant API proxy.
 * When running in Ingress, we hit the relative path '/_ha_api/' which is proxied
 * by the add-on's Nginx to the HA Supervisor.
 */
export const getHomeAssistantAutoUrl = (): string => {
    // In Ingress, the base path is something like /api/hassio_ingress/token/
    // We want to hit the same container's /_ha_api endpoint.
    // The safest way is to use a path relative to the current base.
    
    const base = window.location.href.split('/api/hassio_ingress/')[0];
    return `${base}/_ha_api`;
};

/**
 * Dummy token for use with the auto-proxy.
 * The proxy actually injects the real token from environment variables.
 */
export const HA_AUTO_LOGIN_TOKEN = 'auto_login_via_ingress';

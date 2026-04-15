#!/usr/bin/with-contenv bashio
# ==============================================================================
# Home Assistant Add-on: Curio
# Serves the pre-built Curio web app via nginx with HA auto-login support
# ==============================================================================

bashio::log.info "Starting Curio web server on port 8099..."

# SUPERVISOR_TOKEN is provided by the HA Supervisor to addons with
# homeassistant_api: true.
SUPERVISOR_TOKEN="${SUPERVISOR_TOKEN:-}"

if [ -n "${SUPERVISOR_TOKEN}" ]; then
    bashio::log.info "Supervisor token detected -- enabling HA auto-login"

    # 1. Write runtime config JSON so the frontend can detect ingress
    cat > /var/www/html/ha-runtime-config.json <<EOF
{
  "haIngress": true,
  "supervisorToken": "${SUPERVISOR_TOKEN}"
}
EOF
    chmod 644 /var/www/html/ha-runtime-config.json

    # 2. Inject the token into the nginx config for API proxying
    sed -i "s|__SUPERVISOR_TOKEN__|${SUPERVISOR_TOKEN}|g" /etc/nginx/http.d/default.conf
else
    bashio::log.warning "No SUPERVISOR_TOKEN found -- HA auto-login disabled"
    # Remove the proxy token placeholder so nginx doesn't break
    sed -i "s|__SUPERVISOR_TOKEN__||g" /etc/nginx/http.d/default.conf
fi

# Run nginx in the foreground so the container stays alive
exec nginx -g "daemon off;"

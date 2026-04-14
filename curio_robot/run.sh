#!/usr/bin/with-contenv bashio

echo "Injecting Supervisor token..."
sed -i "s/%%SUPERVISOR_TOKEN%%/${SUPERVISOR_TOKEN}/g" /etc/nginx/conf.d/default.conf

echo "Starting Curio Robot Add-on..."

# Start Nginx
nginx -g "daemon off;"

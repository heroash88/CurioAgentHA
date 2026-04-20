# Dockerfile for the Curio Robot HA addon.
# HA builds from this folder (curio/) as the Docker context.
# The deploy script copies dist/ into this folder before pushing.

ARG BUILD_FROM
FROM ${BUILD_FROM}

# nginx -- serves the static app
# nodejs + npm -- runs the bundled Nova Sonic WebSocket proxy
RUN apk add --no-cache nginx nodejs npm

# Web app
COPY dist/ /var/www/html/
COPY nginx.conf /etc/nginx/http.d/default.conf

# Nova Sonic proxy. npm ci would need package-lock.json; install is fine
# for a single pinned dep (ws) and keeps the image self-contained without
# shipping node_modules through git.
WORKDIR /opt/nova-proxy
COPY nova-proxy-package.json ./package.json
COPY nova-proxy.mjs ./nova-proxy.mjs
RUN npm install --omit=dev --no-audit --no-fund --loglevel=error \
    && npm cache clean --force

WORKDIR /

COPY run.sh /
RUN chmod a+x /run.sh

EXPOSE 8099

# HA base images use s6-overlay as init. CMD must invoke run.sh via s6;
# run.sh's `#!/usr/bin/with-contenv bashio` shebang integrates with s6.
# Do NOT set ENTRYPOINT here -- it would override s6's /init and break
# with-contenv (container_environment is populated by s6).
CMD ["/run.sh"]

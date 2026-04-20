# Dockerfile for the Curio Robot HA addon.
# HA builds from this folder (curio/) as the Docker context.
# The deploy script copies dist/ into this folder before pushing.

ARG BUILD_FROM
FROM ${BUILD_FROM}

# nginx -- serves the static app
# nodejs + npm -- runs the bundled Nova Sonic WebSocket proxy
# tini -- so we can run nginx and node together under a single PID 1
RUN apk add --no-cache nginx nodejs npm tini

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

# tini reaps zombies and forwards signals. run.sh starts the Nova proxy
# in the background and nginx in the foreground.
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["/run.sh"]

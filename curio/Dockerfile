# Simplified Dockerfile for pre-built dist/ (Option B)
# Use this when the dist/ folder is already built and included in the repo.
# The full-build Dockerfile (Dockerfile) is for monorepo setups where
# the source code lives alongside the addon config.

ARG BUILD_FROM
FROM ${BUILD_FROM}

# Install nginx
RUN apk add --no-cache nginx

# Copy the pre-built app
COPY dist/ /var/www/html/

# Copy addon config files
COPY curio/nginx.conf /etc/nginx/http.d/default.conf
COPY curio/run.sh /run.sh
RUN chmod a+x /run.sh

EXPOSE 8099

CMD ["/run.sh"]

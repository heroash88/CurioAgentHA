# Dockerfile for the Curio Robot HA addon.
# HA builds from this folder (curio/) as the Docker context.
# The deploy script copies dist/ into this folder before pushing.

ARG BUILD_FROM
FROM ${BUILD_FROM}

RUN apk add --no-cache nginx

COPY dist/ /var/www/html/
COPY nginx.conf /etc/nginx/http.d/default.conf
COPY run.sh /
RUN chmod a+x /run.sh

EXPOSE 8099

# HA base images use s6-overlay as init. CMD must be /init so s6
# starts as PID 1. run.sh is invoked by s6 via the shebang
# #!/usr/bin/with-contenv bashio which integrates with s6.
CMD ["/run.sh"]

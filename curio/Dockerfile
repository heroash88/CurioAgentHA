# Dockerfile for the Curio Robot HA addon.
# HA builds from this folder (curio/) as the Docker context.
# The deploy script copies dist/ into this folder before pushing.

ARG BUILD_FROM
FROM ${BUILD_FROM}

RUN apk add --no-cache nginx

COPY dist/ /var/www/html/
COPY nginx.conf /etc/nginx/http.d/default.conf
COPY run.sh /run.sh
RUN chmod a+x /run.sh

EXPOSE 8099

CMD ["/run.sh"]

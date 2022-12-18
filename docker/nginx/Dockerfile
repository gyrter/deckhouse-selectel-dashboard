FROM nginx:1.21.6-alpine

COPY docker/nginx/http.js /etc/nginx/
RUN adduser -u 7000 -h /var/www -s /sbin/nologin -D app \
    && mkdir -p /etc/nginx/auth.d
STOPSIGNAL SIGQUIT

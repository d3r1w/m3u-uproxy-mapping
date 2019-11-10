FROM node:lts-alpine
RUN apk add --no-cache tini
WORKDIR /home/node/m3u-proxy-mapping
ENV NODE_ENV=production
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV M3U_UPROXY_MAPPING_SERVICE_PORT=10337
ENV M3U_UPROXY_MAPPING_SERVICE_CACHE_TTL=216000
ENV M3U_UPROXY_MAPPING_SERVICE_UDPROXY_PROTOCOL=http
COPY . ./
RUN npm ci
EXPOSE 10337/tcp
USER node
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "index.js"]

FROM node:22.11.0-alpine3.20

USER node

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

RUN npm ci --omit=dev

COPY --chown=node:node ./ ./

CMD ["/usr/local/bin/npm", "run","dev:express"]
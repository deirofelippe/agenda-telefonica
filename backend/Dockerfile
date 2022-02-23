FROM node:16-alpine3.14
WORKDIR /app
USER node
COPY package*.json ./
RUN npm install
COPY ./ ./
CMD tail -f /dev/null
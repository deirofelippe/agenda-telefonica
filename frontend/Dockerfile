FROM node:22.11.0-alpine3.20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ ./
CMD tail -f /dev/null
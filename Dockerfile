FROM node:22.11.0-bookworm-slim

RUN apt update \
    && apt install -y git curl 

USER node

WORKDIR /home/node/app

CMD [ "sleep", "infinity" ]
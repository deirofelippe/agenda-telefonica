FROM node:22.11.0-bookworm-slim

RUN apt update \
    # troubleshooting redes (nc ss tcpdump curl ping)
    && apt install -y netcat-openbsd iproute2 tcpdump curl mtr \
    && apt install -y git

USER node

WORKDIR /home/node/app

CMD [ "sleep", "infinity" ]
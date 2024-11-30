#!/bin/bash

HOME_SCRIPTS_PATH=/home/ubuntu/aws-scripts
SUDO_CMD=/usr/bin/sudo

sudo apt update
sudo apt install -y netcat-openbsd iproute2 tcpdump curl mtr make

echo ""
echo "============================================="
echo "========== CONFIG DOCKER ===================="
echo "============================================="
echo ""
source ./config-docker.sh

echo ""
echo "============================================="
echo "========== CONFIG NGINX ====================="
echo "============================================="
echo ""
source ./config-nginx.sh

echo ""
echo "============================================="
echo "========== CONFIG SYSTEMD ==================="
echo "============================================="
echo ""
source ./config-systemd.sh

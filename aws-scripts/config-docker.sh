#!/bin/bash

install_docker(){
  sudo apt install -y ca-certificates curl &&
  sudo install -m 0755 -d /etc/apt/keyrings &&
  sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc &&
  sudo chmod a+r /etc/apt/keyrings/docker.asc &&

  # Add the repository to Apt sources:
  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null &&

  sudo apt update &&

  sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin &&

  # Verificando se o docker foi instalado corretamente
  sudo docker container run hello-world
}

install_mysql(){
  sudo docker pull mysql:8.0.40-bookworm

  sudo docker container run -d --name mysql -e MYSQL_ROOT_PASSWORD=root -p 6603:3306 mysql:8.0.40-bookworm
}

EXIST="0"

sudo docker version &> /dev/null
DOCKER_CMD_OUTPUT="$(echo $?)"
sudo docker compose version &> /dev/null
DOCKER_COMPOSE_CMD_OUTPUT="$(echo $?)"

sudo docker image ls | grep mysql &> /dev/null
MYSQL_CMD_OUTPUT="$(echo $?)"

if [[ $DOCKER_CMD_OUTPUT != $EXIST || $DOCKER_COMPOSE_CMD_OUTPUT != $EXIST ]]; then
  install_docker
fi

if [[ $MYSQL_CMD_OUTPUT != $EXIST ]]; then
  install_mysql
fi

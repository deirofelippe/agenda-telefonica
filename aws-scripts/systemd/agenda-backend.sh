#!/bin/bash

echo "Configurando as variáveis."
ENV_FILE=/home/ubuntu/aws-scripts/agenda-backend/.env.backend
IMAGE_TAG=v3.2
CONTAINER_NAME=agenda-backend
IMAGE_NAME=deirofelippe/agenda-telefonica-backend:$IMAGE_TAG

create_container(){
  echo "Imagem que será executada '$IMAGE_NAME'."
  echo "Criando o container..."
  echo ""

  sudo docker container run \
    --detach \
    --name $CONTAINER_NAME \
    --restart "always" \
    --publish 3000:3000 \
    --env-file $ENV_FILE \
    --volume $HOME/.aws:/home/node/.aws \
    --health-cmd "curl -f http://localhost:3000/healthz" \
    --health-interval 5s \
    --health-retries 10 \
    --health-start-period 20s \
    --health-timeout 5s \
    $IMAGE_NAME

  echo ""
  echo "Container criado e está executando em segundo plano."
}

remove_container(){
  echo "Removendo o container..."
  echo ""

  sudo docker container rm -f $CONTAINER_NAME

  echo ""
  echo "Container foi removido."
}

print_info(){
  echo "Para saber mais sobre, execute: "
  echo "  sudo docker container ls -a"
  echo "  sudo docker container logs -f $CONTAINER_NAME"
  echo ""
}

SLEEP_SECONDS=10
while true; do
  sleep $SLEEP_SECONDS

  sudo docker container ls -a | grep -i "agenda-backend" &> /dev/null
  CONTAINER_EXISTS=$(echo $?)

  if [[ $CONTAINER_EXISTS != "0" ]]; then
    create_container
    print_info
    SLEEP_SECONDS=10
    continue
  fi

  sudo docker container ls -a | grep -i "agenda-backend" | grep -i -E "(exited)|(paused)|(dead)|(removing)" &> /dev/null
  CONTAINER_STATUS_IS_BAD=$(echo $?)

  if [[ $CONTAINER_STATUS_IS_BAD == "0" ]]; then
    remove_container
    create_container
    print_info
    SLEEP_SECONDS=10
    continue
  fi

  SLEEP_SECONDS=3
done

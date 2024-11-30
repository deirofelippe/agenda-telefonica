#!/bin/bash

SYSTEMD_SCRIPTS_PATH=$HOME_SCRIPTS_PATH/systemd
BIN_PATH=/usr/bin
SYSTEMD_PATH=/etc/systemd/system/
SERVICE_NAME=agenda-backend
SERVICE_FILE_NAME=$SERVICE_NAME.service
BASH_FILE_NAME=$SERVICE_NAME.sh


move_files_and_change_permissions(){
    echo "Movendo '$SERVICE_NAME.sh' para outra pasta"
    sudo cp $SYSTEMD_SCRIPTS_PATH/$BASH_FILE_NAME $BIN_PATH/$BASH_FILE_NAME

    echo "Movendo '$SERVICE_FILE_NAME' para outra pasta"
    sudo cp $SYSTEMD_SCRIPTS_PATH/$SERVICE_FILE_NAME $SYSTEMD_PATH/

    echo "Mudando permissão de '$BASH_FILE_NAME'"
    sudo chmod 751 $BIN_PATH/$BASH_FILE_NAME

    echo "Mudando permissão de '$SERVICE_FILE_NAME'"
    sudo chmod 644 $SYSTEMD_PATH/$SERVICE_FILE_NAME
}

create_service(){
    echo "Ativando o service '$SERVICE_NAME' para iniciar no boot"
    sudo systemctl --now enable $SERVICE_NAME
}

reload(){
    echo "Reiniciando o daemon"
    sudo systemctl daemon-reload

    echo "Reiniciando o service '$SERVICE_NAME'"
    sudo systemctl restart $SERVICE_NAME
}

SUCCESS_CODE=0

sudo systemctl status $SERVICE_NAME &> /dev/null
SERVICE_EXISTS=$(echo $?)
echo "SERVICE_EXISTS: $SERVICE_EXISTS"

move_files_and_change_permissions
if [[ $SERVICE_EXISTS == $SUCCESS_CODE ]]; then
    reload
else
    create_service
fi

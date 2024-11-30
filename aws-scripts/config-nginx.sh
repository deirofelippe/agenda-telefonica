#!/bin/bash

SITES_AVAILABLE=/etc/nginx/sites-available
SITES_ENABLED=/etc/nginx/sites-enabled
CONF_PATH=$HOME_SCRIPTS_PATH/nginx
FILE_NAME=agenda-backend.com.br

install_nginx(){
    sudo apt update
    sudo apt install -y nginx
}

configure_agenda_backend(){
    echo "Movendo o conf para o '$SITES_AVAILABLE/'"
    sudo cp $CONF_PATH/$FILE_NAME $SITES_AVAILABLE/$FILE_NAME
    
    echo "Criando link simbólico para o '$SITES_ENABLED'"
    sudo ln -s $SITES_AVAILABLE/$FILE_NAME $SITES_ENABLED/
    
    sudo mkdir $SITES_AVAILABLE/bkp/
    
    echo "Movendo o conf padrao para o bkp em '$SITES_AVAILABLE/bkp/'"
    sudo mv $SITES_AVAILABLE/default $SITES_AVAILABLE/bkp/

    echo "Removendo link simbólico do '$SITES_ENABLED'"
    sudo rm $SITES_ENABLED/default
    
    echo "Atualizando o nginx"
    sudo nginx -t
    sudo nginx -s reload
}

install_nginx

configure_agenda_backend
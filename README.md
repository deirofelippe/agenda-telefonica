# Agenda telefônica

## Como usar com docker?

1. sh executar-sistema.sh

OU

1. docker volume create --name=v_mysql
1. docker-compose up -d
1. docker-compose exec mysql mysql -uroot --password=root -e "create database if not exists agenda; create database if not exists agenda_test;"
1. docker-compose exec agenda-backend npx sequelize db:migrate
1. docker-compose exec agenda-backend npx sequelize db:seed:all
1. docker-compose exec agenda-backend npm start
1. docker-compose exec agenda-frontend npm start

# Agenda telefônica

- [Como usar com docker?](#como-usar-com-docker)
- [Screenshots v2](#screenshots-v2)
- [Screenshots v1](#screenshots-v1)

## Como usar com docker?

1. `sh run-app.sh`

**OU**

1. `docker volume create --name=v_mysql`
1. `docker-compose up -d`
1. `docker-compose exec mysql mysql -uroot --password=root -e "create database if not exists agenda; create database if not exists agenda_test;"`
1. `docker-compose exec agenda-backend npx sequelize db:migrate`
1. `docker-compose exec agenda-backend npx sequelize db:seed:all`
1. `docker-compose exec -d agenda-backend npm start`
1. `docker-compose exec -d agenda-frontend npm start`
1. siga os passos do README da pasta `s3-serverless`

**CASO QUEIRA EXECUTAR OS TESTES**

1. `docker-compose exec agenda-backend npm test`

## Screenshots v2

![](./img/v2/1.png)
![](./img/v2/2.png)
![](./img/v2/3.png)
![](./img/v2/4.png)
![](./img/v2/5.png)
![](./img/v2/6.png)
![](./img/v2/7.png)
![](./img/v2/8.png)

## Screenshots v1

![](./img/v1/1.png)
![](./img/v1/2.png)
![](./img/v1/3.png)
![](./img/v1/4.png)
![](./img/v1/5.png)
![](./img/v1/6.png)

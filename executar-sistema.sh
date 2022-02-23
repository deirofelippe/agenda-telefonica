docker volume create --name=v_mysql 
&& docker-compose up -d 
&& sleep 10
&& docker-compose exec mysql mysql -uroot --password=root -e "create database if not exists agenda; create database if not exists agenda_test;"
&& docker-compose exec agenda-backend npx sequelize db:migrate
&& docker-compose exec agenda-backend npx sequelize db:seed:all
&& docker-compose exec agenda-backend npm start
&& docker-compose exec agenda-frontend npm start
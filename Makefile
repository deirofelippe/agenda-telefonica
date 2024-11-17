ci-cd:
	@gh extension exec act --secret-file .env.act-secrets -C ./ -j ci

open-coverage:
	@firefox --new-window ./backend/coverage/lcov-report/index.html

open-build-frontend:
	@firefox --new-window ./frontend/dist/index.html

up: 
	@docker compose up -d --build

down:
	@docker compose down

backend-start:
	@docker container exec -it -u node agenda-backend ash -c "npm run dev"

backend-exec:
	@docker container exec -it -u node agenda-backend ash

backend-exec-root:
	@docker container exec -it -u root agenda-backend ash

frontend-start:
	@docker container exec -it -u node agenda-frontend ash -c "npm run dev"

frontend-express:
	@docker container exec -it -u node agenda-frontend ash -c "npm run dev:express"

frontend-exec:
	@docker container exec -it -u node agenda-frontend ash 

frontend-exec-root:
	@docker container exec -it -u root agenda-frontend ash 

terraform-apply:
	@terraform -chdir=./terraform apply -auto-approve

terraform-destroy:
	@terraform -chdir=./terraform destroy -auto-approve

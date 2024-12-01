init-all: up terraform-init-local terraform-apply-local

ci-cd:
	@gh extension exec act --secret-file .env.act-secrets -C ./ -j ci

open-coverage:
	@firefox --new-window ./backend/coverage/lcov-report/index.html

open-build-frontend:
	@firefox --new-window ./frontend/dist/index.html

### Docker

up: 
	@docker compose up -d --build

down:
	@docker compose down

backend-dev:
	@docker container exec -it -u node agenda-backend ash -c "npm run dev"

backend-logs:
	@docker container logs -f agenda-backend 

backend-exec:
	@docker container exec -it -u node agenda-backend ash

backend-exec-root:
	@docker container exec -it -u root agenda-backend ash

backend-test:
	@docker container exec -it -u node agenda-backend ash -c "npm run test:cov"

frontend-dev:
	@docker container exec -it -u node agenda-frontend ash -c "npm run dev"

frontend-build:
	@docker container exec -it -u node agenda-frontend ash -c "npm run build:prod"

frontend-pull-and-build:
	@docker container run --rm -w /home/node/app -v $$(pwd)/frontend:/home/node/app deirofelippe/agenda-telefonica-frontend-dev:latest ash -c "npm ci && npm run build:prod"

frontend-express:
	@docker container exec -it -u node agenda-frontend ash -c "npm run dev:express"

frontend-logs:
	@docker container logs -f agenda-frontend 

frontend-exec:
	@docker container exec -it -u node agenda-frontend ash 

frontend-exec-root:
	@docker container exec -it -u root agenda-frontend ash 

### Terraform

terraform-init:
	@terraform -chdir=./terraform init

terraform-apply:
	@terraform -chdir=./terraform apply -auto-approve

terraform-plan:
	@terraform -chdir=./terraform plan

terraform-destroy:
	@terraform -chdir=./terraform destroy -auto-approve

terraform-init-local:
	@terraform -chdir=./terraform-local init

terraform-apply-local:
	@terraform -chdir=./terraform-local apply -auto-approve

terraform-plan-local:
	@terraform -chdir=./terraform-local plan

terraform-destroy-local:
	@terraform -chdir=./terraform-local destroy -auto-approve

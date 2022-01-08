#!/usr/bin/make

POSTGRES_USER := postgres
POSTGRES_PASSWORD := PASSWORDISNOTINPRODUCTION123
SECRET_FILE := .secrets

generate-secrets:
	echo "POSTGRES_USER=${POSTGRES_USER}" > ${SECRET_FILE}
	echo "POSTGRES_PASSWORD=${POSTGRES_PASSWORD}" >> ${SECRET_FILE}

build:
	docker-compose build

run:
	docker-compose up

run-api:
	docker-compose up api

run-frontend:
	docker-compose up frontend

run-db:
	docker-compose up db

stop:
	docker-compose down --remove-orphans
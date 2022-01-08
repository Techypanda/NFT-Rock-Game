#!/usr/bin/make

build:
	docker-compose build

run:
	docker-compose up

run-api:
	docker-compose up api

run-frontend:
	docker-compose up frontend

stop:
	docker-compose down --remove-orphans
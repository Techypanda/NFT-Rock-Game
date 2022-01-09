FROM node:alpine AS build

WORKDIR /app
COPY . /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
EXPOSE 3000
EXPOSE 49153
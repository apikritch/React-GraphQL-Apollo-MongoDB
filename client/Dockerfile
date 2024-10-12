FROM node:18.14.2-alpine AS build

WORKDIR /client

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:latest

COPY --from=build /client/build /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf

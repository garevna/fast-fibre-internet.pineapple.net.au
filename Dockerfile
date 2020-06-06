# Build VueJS Project. We need only dist (build stage)
FROM node:13-alpine as build-stage

WORKDIR /usr/app

COPY . .

RUN yarn install

RUN yarn build

# Copy from VueJS Build Stage dist folder to nginx (production-stage)
FROM nginx:1.17-alpine as production-stage

COPY --from=build-stage /usr/app/dist /usr/share/nginx/html

COPY .docker/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

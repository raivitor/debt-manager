FROM node:12.16-alpine as node

ENV NPM_CONFIG_LOGLEVEL=error

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --no-optional && npm cache clean --force

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY . ./
RUN ng build --prod

EXPOSE 4000 4200 4433 5000 8080 9876

FROM nginx:stable-alpine
VOLUME /var/cache/nginx
COPY --from=node /usr/src/app/dist/frontend /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

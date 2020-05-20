FROM node:12.16-alpine

ENV NPM_CONFIG_LOGLEVEL=error

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

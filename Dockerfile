FROM node:12.18.1

RUN mkdir /nodejs-deploy

WORKDIR /nodejs-deploy

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "node", "server.js" ]
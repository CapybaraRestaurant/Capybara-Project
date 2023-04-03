FROM node:18

WORKDIR /home/ubuntu/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]
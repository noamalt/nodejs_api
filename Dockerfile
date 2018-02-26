FROM node:7
WORKDIR /nodejs_api
COPY package.json /app
RUN npm install
COPY . /app
CMD node server.js
EXPOSE 8080
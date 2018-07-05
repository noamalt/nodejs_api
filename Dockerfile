FROM node:7
WORKDIR /nodejs_api
COPY package.json /nodejs_api
RUN npm install
COPY . /nodejs_api
CMD node server.ts
EXPOSE 8080
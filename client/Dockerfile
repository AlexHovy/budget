FROM node:latest
WORKDIR /client
COPY package*.json ./
RUN npm install -g npm@latest
COPY . .
EXPOSE 3000

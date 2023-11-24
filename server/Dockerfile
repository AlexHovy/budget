FROM node:latest
WORKDIR /server
COPY package*.json ./
RUN npm install -g npm@latest
COPY . .
EXPOSE 8080

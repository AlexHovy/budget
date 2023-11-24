FROM node:latest
WORKDIR /client
COPY package*.json ./
RUN npm install -g npm@latest && npm install
COPY . .
EXPOSE 3000

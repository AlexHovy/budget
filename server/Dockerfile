FROM node:latest
WORKDIR /server
COPY package*.json ./
RUN npm install -g npm@latest && npm install
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
COPY . .
EXPOSE 8080

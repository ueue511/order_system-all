FROM node:14.16.0-alpine AS build-stage

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 
# RUN npm install --only=production

# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.6.0/wait /wait 

# RUN chmod +x /wait

COPY . .

EXPOSE 3010
# CMD [ "npm", "run", "dev"]
FROM node:20-alpine3.18 AS builder

WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --legacy-peer-deps && npx prisma generate

COPY . .

RUN npm run build

EXPOSE 8080
CMD npm run start:prod
FROM node:22.9.0-alpine AS builder

WORKDIR /app
COPY ./be .

RUN npm install --legacy-peer-deps

ARG DATABASE_URL
ARG DIRECT_URL
ARG PORT

ENV DATABASE_URL=$DATABASE_URL
ENV DIRECT_URL=$DIRECT_URL
ENV PORT=$PORT

RUN npm install -g dotenv-cli
RUN npx prisma generate 
RUN npm run prisma:migration && npm run prisma:seeding
RUN npm run build

EXPOSE 3002
CMD npm run start:prod
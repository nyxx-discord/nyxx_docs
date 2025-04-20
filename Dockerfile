FROM node:20-alpine as build

ARG PROD_URL
ARG REPO_NAME_PROD
ARG REPO_BRANCH_NAME

ENV NODE_ENV=production
ENV PROD_URL=$PROD_URL
ENV REPO_NAME_PROD=$REPO_NAME_PROD
ENV REPO_BRANCH_NAME=$REPO_BRANCH_NAME

WORKDIR /app

COPY . /app

RUN npm install --omit=dev

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
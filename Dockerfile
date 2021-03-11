# build stage
FROM node:10 as build-stage
LABEL MAINTAINER J. Miguel Pantaleon <jose.pantaleon@infotec.mx>
ARG VUE_APP_BASE_URL
ARG VUE_APP_SITE_KEY
RUN echo VUE_APP_BASE_URL=$VUE_APP_BASE_URL
RUN echo VUE_APP_SITE_KEY=$VUE_APP_SITE_KEY
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:1.13.12-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html/
#COPY --from=build-stage /app/dist/build.js /usr/share/nginx/html/dist/

#nginx config
COPY nginx.conf /temp/qa.conf
RUN envsubst /app < /temp/qa.conf > /etc/nginx/conf.d/default.conf


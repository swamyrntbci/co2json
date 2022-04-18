### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:14-alpine as builder
ARG http_proxy
ARG https_proxy 

LABEL SIA="ESC"
LABEL IRN="IRN-71850"
LABEL PROJECT_NAME="CarbonFootprint"
MAINTAINER "ISITTeam"

COPY package.json .

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /app && cp -R ./node_modules ./app

## Move to /app 
WORKDIR /app

# Copy everything from host to /app in the container
COPY . .

## Build the angular app and store the artifacts in dist folder. Production mode should be enable for production build.
RUN $(npm bin)/ng build --prod

### STAGE 2: Setup ###

FROM nginx:1.17.0-alpine

RUN set -x \
&& apk add --update --no-cache curl bash

RUN ln -sf /bin/bash /bin/sh

# Remove the default Nginx configuration file
RUN rm -v /etc/nginx/nginx.conf

## Copy our default nginx config
COPY nginx/nginx.conf /etc/nginx/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

# container run
EXPOSE 80/tcp

CMD ["/entrypoint.sh","nginx", "-g", "daemon off;"]

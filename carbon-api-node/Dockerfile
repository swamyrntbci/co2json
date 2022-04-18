FROM node:14-alpine as builder

WORKDIR /user/src
COPY package.json .

COPY node_modules node_modules


FROM node:14-alpine

WORKDIR /home/user
COPY --from=builder /user/src ./
COPY src src
COPY lighthouse lighthouse
COPY healthcheck.js .
RUN ls -lrt

# injected at build time
ARG COMMIT_HASH
ARG DATE
ENV BUILD_COMMIT_HASH=$COMMIT_HASH
ENV BUILD_DATE=$DATE

# injected at runtime
ENV HTTP_PROXY=
ENV HTTPS_PROXY=$HTTP_PROXY
ENV NODE_ENV=development
ENV LOG_LEVEL=info
ENV NO_PROXY=
ENV PORT=9000

CMD node src
EXPOSE $PORT

HEALTHCHECK --interval=1m --timeout=3s \
  CMD node healthcheck.js

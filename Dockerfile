FROM node:10.13.0

WORKDIR /blog

ADD build public/
ADD dist/server.js server.js

RUN yarn global add serve
RUN yarn global add concurrently

RUN yarn install

EXPOSE 5000

CMD NODE_ENV=production \
    concurrently "serve public" "node server.js"

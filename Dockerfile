FROM node:10.13.0

WORKDIR /blog

ADD build public/
ADD dist/server.js server.js

CMD NODE_ENV=production \
    DB_PATH=/roger/db \
    node server.js

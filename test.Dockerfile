FROM node:16-alpine

WORKDIR app

COPY test-server/package.json test-server /yarn.lock ./

RUN yarn install

COPY test-server ./

CMD yarn start

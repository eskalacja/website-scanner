FROM node:18-alpine

# Installs latest Chromium (77) package.
RUN apk add \
      chromium \
      nss \
      freetype \
      freetype-dev \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      tini

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

WORKDIR /app
COPY app/package.json ./package.json
COPY app/yarn.lock ./yarn.lock

RUN yarn install

COPY app ./

RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads /app \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

USER pptruser

ENTRYPOINT ["/sbin/tini", "--"]

CMD node index.js

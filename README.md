# Docker based website scanner

This docker image crawls your website and finds all dead links.

## What's under the hood
As for now it's "just" a docker wrapper around [puppeteer](https://github.com/puppeteer/puppeteer/) Chromium driver.

When container runs, it uses Chromium to open the `APP_ROOT_URL` page and then starts crawling entire site looking for dead links.

## How to run

1. `docker pull ghcr.io/eskalacja/website-scanner:latest`
2. `docker run --cap-add=SYS_ADMIN -e APP_ROOT_URL=https://example.com -e APP_VERBOSE=1 -v "$(pwd)":/app/output ghcr.io/eskalacja/website-scanner`

Point 2. will run a pulled docker image that will check https://example.com website, in verbose logging mode and will mount output directory to the current bash directory.

That means, once the process is done, you will find resultTest files in this directory.

`SYS_ADMIN` docker capability is required to make the browser run in sandbox mode.

If you can't or don't want to use that capability, you can also run it in non-sandbox mode by adding another environmental variable:

`docker run  -e APP_NO_SANDBOX=1 -e APP_ROOT_URL=https://example.com -e APP_VERBOSE=1 -v "$(pwd)":/app/output ghcr.io/eskalacja/website-scanner`

## How to extend
You might want to use this docker image as a base image for your Dockerfile

You can copy the `CMD` part of this or write your own script that imports from `main.js`.

Example:

```Dockerfile
# /Dockerfile - custom dockerfile in your project
FROM ghcr.io/eskalacja/website-scanner:latest

# User must be same as main image user
USER pptruser

# Workdir cannot be /app if you use  your own package.json!
# Also to avoid permission issues it's best to keep it in the user home.
WORKDIR /home/pptruser/

COPY runner.js .

# IF WORKDIR would be /app this would remove all main docker image node_modules
COPY package.json yarn.lock ./

CMD node runner.js
```

```javascript
// /runner.js
// Load main function from /app folder where everything default lives.
const main = require('../main');

const customRunner = async () => {
  // Do some preparations

  // Run the scanner as it would run from default CMD
  // Don't forget the env variables
  await main();

  // Do some post processing. Keep in mind this has access to internal container /output folder.
}

customRunner();
```

## Docker Hub deprecation!
Warning: This container is no longer published on Docker Hub. Please use `ghcr.io` registry.

## ENV variables

- `APP_ROOT_URL` - required, url that scanner uses as a starting point (first page).
- `APP_VERBOSE=false` - optional, if set (to anything that's not 0), app will log in verbose mode.
- `APP_SLEEP_TIME=25` - optional, how long (in ms) process will sleep between uptime tests and browsing next page.
- `APP_TIMEOUT=0` - optional, after how long (in ms) process must abort running and exit with code 1, defaults to 0 which means it's disabled.
- `APP_NO_SANDBOX_MODE=1` - optional, if set (to anything that's not 0), app will use Chromium browser in a non-sandbox mode.
- `APP_LINKS_LIMIT=0` - optional, when set scan would stop after reaching the gathered links limit
- `APP_UPTIME_CHECK_TIMEOUT=10` - optional, uptime check timeout (in seconds)

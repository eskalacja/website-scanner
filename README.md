# Docker based website scanner

This docker image crawls your website and finds all dead links.

## Ongoing development

This code is under active development.

## How to run

1. `docker pull ghcr.io/eskalacja/website-scanner:latest`
2. `docker run --cap-add=SYS_ADMIN -e APP_ROOT_URL=https://example.com -e APP_VERBOSE=1 -v "$(pwd)":/app/output ghcr.io/eskalacja/website-scanner`

Point 2. will run a pulled docker image that will check https://example.com website, in verbose logging mode and will mount output directory to the current bash directory.

That means, once the process is done, you will find result files in this directory.

## Docker Hub deprecation!
Warning: This container is no longer published on Docker Hub. Please use `ghcr.io` registry.

## ENV variables

- `APP_ROOT_URL` - required, url that scanner uses as a starting point (first page).
- `APP_VERBOSE=false` - optional, if set (to anything that's not 0), app will log in verbose mode.
- `APP_SLEEP_TIME=25` - optional, how long (in ms) process will sleep between uptime tests and browsing next page.
- `APP_TIMEOUT=600000` - after how long (in ms) process must abort running and exit with code 1.

# Docker based website scanner

## Ongoing development

This code is under active development.

Soon you'll find here detailed information how to use it. But it's not there yet.

## How to run

1. `docker pull eskalacja/website-scanner`
2. `docker run -e APP_ROOT_URL=https://example.com -e APP_VERBOSE=1 -v "$(pwd)":/app/output eskalacja/website-scanner`

Point 2. will run a pulled docker image that will check https://example.com website, in verbose logging mode and will mount output directory to the current bash directory.

That means, once the process is done, you will find result files in this directory.
## ENV variables

- `APP_ROOT_URL` - required, url that scanner uses as a starting point (first page)
- `APP_VERBOSE` - optional, if set (to anything that's not 0), app will log in verbose mode

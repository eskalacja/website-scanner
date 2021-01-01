const { getEnv } = require('./helpers/env');
const { scan } = require('./scanner');

const main = async () => {
  const rootUrl = getEnv('APP_ROOT_URL', true);
  const verbose = !!getEnv('APP_VERBOSE');

  await scan(rootUrl, { verbose });
};

main();

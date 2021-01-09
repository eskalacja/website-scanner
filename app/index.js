const { getEnv } = require('./helpers/env');
const { scan } = require('./scanner');

const main = async () => {
  const rootUrl = getEnv('APP_ROOT_URL');
  const verbose = !!getEnv('APP_VERBOSE', { defaultValue: false });

  await scan(rootUrl, { verbose });
};

main();

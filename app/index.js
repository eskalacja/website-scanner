const { getEnv } = require('./helpers/env');
const { scan } = require('./scanner');

const main = async () => {
  const rootUrl = getEnv('APP_ROOT_URL');
  const verbose = !!getEnv('APP_VERBOSE', { defaultValue: false });
  const sleepTime = parseInt(getEnv('APP_SLEEP_TIME', { defaultValue: 25 }), 10);

  await scan(rootUrl, { verbose, sleepTime });
};

main();

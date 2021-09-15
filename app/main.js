const { getEnv } = require('./helpers/env');
const { scan } = require('./scanner');

const main = async () => {
  const rootUrl = getEnv('APP_ROOT_URL');
  const verbose = !!getEnv('APP_VERBOSE', { defaultValue: false });
  const noSandbox = !!getEnv('APP_NO_SANDBOX', { defaultValue: false });
  const sleepTime = parseInt(getEnv('APP_SLEEP_TIME', { defaultValue: 25 }), 10);
  // Default timeout 10 minutes.
  const timeout = parseInt(getEnv('APP_TIMEOUT', { defaultValue: 600000 }), 10);

  const killSwitchTimeout = setTimeout(() => {
    console.error(`Run took too long. Timed out (${timeout}ms)`);
    process.exit(1);
  }, timeout);

  await scan(rootUrl, { verbose, sleepTime, noSandbox });

  clearTimeout(killSwitchTimeout);
};

module.exports = main;

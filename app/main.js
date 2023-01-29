const { getEnv } = require('./helpers/env');
const { scan } = require('./scanner');

const main = async () => {
  const rootUrl = getEnv('APP_ROOT_URL');
  const verbose = !!getEnv('APP_VERBOSE', { defaultValue: false });
  const noSandbox = !!getEnv('APP_NO_SANDBOX', { defaultValue: false });
  const sleepTime = parseInt(getEnv('APP_SLEEP_TIME', { defaultValue: 25 }), 10);
  // Default timeout 10 minutes.
  const timeout = parseInt(getEnv('APP_TIMEOUT', { defaultValue: 0 }), 10);
  const limit = parseInt(
    getEnv('APP_LINKS_LIMIT', { defaultValue: 0 }),
    10,
  );
  const killSwitchTimeout = timeout ? setTimeout(() => {
    console.error(`Run took too long. Timed out (${timeout}ms)`);
    process.exit(1);
  }, timeout) : 0;

  const report = await scan(rootUrl, {
    verbose,
    sleepTime,
    noSandbox,
    limit,
  });

  clearTimeout(killSwitchTimeout);

  return report;
};

module.exports = main;

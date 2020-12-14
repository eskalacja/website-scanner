const { getEnv } = require('./helpers/env');
const { scan } = require('./scanner');

const main = async () => {
  const rootUrl = getEnv('APP_ROOT_URL');

  await scan(rootUrl);
};

main();

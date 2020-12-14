const getEnv = (key) => {
  if (process.env[key]) {
    return process.env[key];
  }

  throw new Error(`Cannot find env variable for key: ${key}`);
};

module.exports = {
  getEnv,
};

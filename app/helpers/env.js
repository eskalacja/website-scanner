const getEnv = (key, { defaultValue } = {}) => {
  if (process.env[key]) {
    return process.env[key];
  }

  if (typeof defaultValue === 'undefined') {
    throw new Error(`Cannot find env variable for key: ${key}`);
  }

  return defaultValue;
};

module.exports = {
  getEnv,
};

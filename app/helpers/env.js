const getEnv = (key, required = false) => {
  if (process.env[key]) {
    return process.env[key];
  }

  if (required) {
    throw new Error(`Cannot find env variable for key: ${key}`);
  }

  return null;

};

module.exports = {
  getEnv,
};

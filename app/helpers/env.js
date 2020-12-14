const getEnv = (key) => {
    if (process.env[key]) {
        return process.env[key];
    }

    console.warn(`Cannot find env variable for key: ${key}`);
    return '';
}

module.exports = {
    getEnv,
}

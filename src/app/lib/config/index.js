const fs = require('fs');
const _ = require('lodash');

const readConfig = fileName => {
    try {
        return JSON.parse(fs.readFileSync(fileName));
    } catch (e) {
        console.error(e)
    }
    return {}
};

const setProperty = (config, fileName, path, value) => {
    _.set(config, path, value);
    writeConfig(config, fileName);
    return config
};

const writeConfig = (config, fileName) => {
    try {
        fs.writeFileSync(fileName, JSON.stringify(config))
    } catch (e) {
        console.error(e)
    }
};

module.exports = (fileName) => {
    let config;
    if (fileName) {
        config = readConfig(fileName);
    }
    return {
        get: path => _.get(config, path),
        set: (path, value) => setProperty(config, fileName, path, value)
    }
};
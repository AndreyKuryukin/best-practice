const _ = require('lodash');
const path = require('path');

const procArgs = require("args-parser")(process.argv);

const DEFAULT_CONFIG = {};
//todo: Replace with "config" npm package
class Config {
    constructor(args = procArgs, defaultCfg = DEFAULT_CONFIG) {
        if (args.config) {
            try {
                this._config = require(path.resolve(process.cwd(), args.config));
            } catch (e) {
                console.log(e);
            }
        } else {
            console.log('Loading default config');
            this._config = defaultCfg
        }
    }

    get(path, defaultValue) {
        return _.get(this._config, path, defaultValue)
    }
}

module.exports = Config;
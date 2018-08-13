const path = require('path');

class Dependency {
    constructor() {

    }

    static resolve(pathName, basePath = process.cwd()) {
        return require(path.resolve(basePath, pathName))
    }
}

module.exports = Dependency;
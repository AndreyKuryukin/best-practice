const path = require('path');

const tryCatch = (() => {
    let result;
    const car = (statement) => {
        if (statement === undefined) {
            return result
        } else {
            try {
                result = statement()
            } catch (e) {
                console.log(e)
            }
        }
        return car
    };
    return car;
})();

class Dependency {
    constructor() {

    }

    static resolve(pathName, basePath = process.cwd()) {
        return tryCatch(() => require(path.resolve(basePath, pathName))) (() => require(pathName)) ()
    }
}

module.exports = Dependency;
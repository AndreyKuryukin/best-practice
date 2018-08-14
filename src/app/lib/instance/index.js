const path = require('path');

const Dependecy = require('../dependency');


class Instance {
    static composeConfig(configString) {
        //todo: make implementation
    };

    constructor(config = {}) {
        if (config.chain) {
            this.chain = this.initChain(config.chain);
        }

        if (config.module) {
            this.module = this.initModule(config.module, config.config)
        }

        if (config.config) {
            this.config = this.initConfig(config.config)
        }

        if (config.name) {
            this.name = config.name
        }


    }

    initConfig(config) {
        return config
    }

    initModule(module) {
        try {
            return Dependecy.resolve(module, path.resolve(__dirname, '../modules'));
        } catch (e) {
            console.log(`Cant find module ${module}`.yellow);
            if (!this.chain || this.chain.length === 1) {
                console.log(`Chain not specifiend => applying transparent module`.yellow);
                return function () {
                    return arguments
                }
            }
        }
    }

    initChain(chainConfig) {
        if (typeof chainConfig === 'string') {
            // todo: Додумать
            return [new Instance(Instance.composeConfig(chainConfig))]
        } else if (chainConfig instanceof Array) {
            return chainConfig.map(cfg => new Instance(cfg))
        } else if (typeof chainConfig === 'object') {
            return [new Instance(chainConfig)]
        }
    }

    applyChain(chain, data, take) {
        let promise = new Promise((resolve) => {
            resolve(data)
        });

        chain.forEach(node => {
            promise = promise.then((content) => {
                return new Promise((resolve) => {
                    const take = result => resolve(result);
                    node.put(content, take)
                })
            })
        });

        return promise.then((content) => ({content, take}));
    }

    processModuleData(data, take) {
        if (this.chain) {
            return this.applyChain(this.chain, data, take)
        } else {
            take(data);
        }
    }

    put(content, take) {
        if (this.module) {
            this.module(content, this.config, data => this.processModuleData(data, take))
        } else if (this.chain) {
            this.applyChain(this.chain, content).then(result => take(result))
        }
    };

}

module.exports = Instance;
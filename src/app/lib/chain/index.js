// Chain Config Example
// [{
//     displayName: 'chain_1',
//     module: 'module_name',
//     options: {}
// }]
//
// module.exports = (chainCfg = []) => {
//     const chainStatus = chainCfg.map(node => {
//         const {displayName, module, options} = node;
//         if (module) {
//             try {
//                 instance = require(`${require.resolve()}/modules/${module}`);
//                 if (typeof instance === 'function') {
//                     return {...node, module: instance}
//                 }
//             }
//         }
//     });
//     return true
// };

const _ = require('lodash');
const validator = require('node-validator');

class Chain {

    constructor(chain) {
        if (!_.isArray(chain)) {
            throw 'Chain config must be array'
        }
        this._chainConfig = chain;
        this._chain = this.buildChain(chain);
    }

    buildChain = chainCfg => _.reduce(chainCfg, (built, node) => {
        if (!_.isPlainObject(node)) {
            throw 'Chain node must be a plain object'
        }
        const {displayName, module, options, chain} = node;
        if () {

        }
        if (_.isString(module)) {
            let instance;

            try {
                instance = require(`${require.resolve()}/modules/${module}`);
            } catch (e) {
                instance = require(module);
            }

            if (_.isFunction(instance)) {
                return {...node, module: instance}
            } else {
                throw 'Module exports must be a function'
            }

        } else if (_.isFunction(module)) {
            return {...node, module}
        }
    }, []);

    buildNode = (node) => {

    }
}

module.exports = Chain;
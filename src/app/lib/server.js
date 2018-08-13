require('colors');

const Instance = require('./instance');
const Config = require('./config');

const INSTANCE_RESOLVE_RULES = {
    'string': cfgStr => new Instance.composeConfig(cfgStr),
    'object': cfg => new Instance(cfg),
    'Instance': instance => instance
};

function resolveInstanceCfg(config) {
    return INSTANCE_RESOLVE_RULES[typeof config](config)
}

function initInstances(instances = []) {
    return instances.map(instCfg => resolveInstanceCfg(instCfg))
}

(() => {
    const config = new Config();
    // const chains = initChains(config.get('chains', []));
    const instances = initInstances(config.get('instances', []));
    instances.forEach(instance => instance.put())
})();


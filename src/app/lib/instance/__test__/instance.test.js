const jest = require('jest-mock');

const Instance = require('../');
const Dependency = require('../../dependency');

const BASE_CONFIG = {
    name: 'Test instance',
    module: 'test_module',
    config: {
        param1: 1,
        param2: '2',
    },
    chain: [{
        name: 'Node1',
        module: 'test_module'
    }]
};

const module_mock = (content, config, take) => {
    const take_res = take(content);
    if (take_res) {
        take_res.then(({ content, take }) => {
            take(content)
        })
    }
};

const resolve_mock = Dependency.resolve = jest.fn();
resolve_mock.mockReturnValue(module_mock);

const instance = new Instance(BASE_CONFIG);

describe('constructor', () => {
    test('init config', () => {
        expect(instance.config).toEqual(BASE_CONFIG.config)
    });
    test('init module', () => {
        expect(instance.module).toEqual(module_mock)
    });
    test('init chain', () => {
        expect(instance.chain).toBeDefined();
        expect(instance.chain[0]).toBeInstanceOf(Instance);
    });
    test('put content', (done) => {
        instance.put('content', (content) => {
            expect(content).toEqual('content');
            done()
        });

    });
});



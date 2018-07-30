const Chain = require('./');
//
// const correctChain = [
//     {
//         displayName: 'Node 1',
//         module: 'NotExistingModule',
//         options: {
//             option1: 'String',
//             option2: 123,
//             option3: [],
//             option4: {},
//             option5: null,
//         }
//     }
// ];

const incorrectChainType = {};

describe('constructor', () => {

    test('incorrect chain type', () => {
        expect(() => {
            new Chain(incorrectChainType);
        }).toThrow('Chain config must be array');
    });

    test('incorrect node type', () => {
        expect(() => {
            new Chain(['incorrectNode']);
        }).toThrow('Chain node must be a plain object');
    });
});

describe('build chain', () => {
    test('incorrect node type', () => {
        expect(() => {
            new Chain(['incorrectNode']);
        }).toThrow('Chain node must be a plain object');
    });
})

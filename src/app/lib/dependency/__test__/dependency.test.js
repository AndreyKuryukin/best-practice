const jest = require('jest');
const Dependency = require('../');

describe('resolve', () => {
    test('node module', () => {
        expect(Dependency.resolve('jest', 'Not/existing/path')).toEqual(jest);
    });

    test('node module', () => {
        expect(Dependency.resolve('dependency', 'src/app/lib')).toEqual(Dependency);
    });

});



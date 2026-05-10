const test = require('ava');
const Validator = require('../src/index');
const { NO_VALID, NO_INVALID } = require('./fixtures');

const validator = new Validator();


NO_VALID.forEach(number => {
    test(`isValidNO: accepts '${number}'`, t => {
        t.true(validator.isValidNO(number));
    });
});

NO_INVALID.forEach(number => {
    test(`isValidNO: rejects '${number}'`, t => {
        t.false(validator.isValidNO(number));
    });
});


test('isValidNO: throws TypeError for non-string non-number input', t => {
    const error = t.throws(() => validator.isValidNO({}));
    t.true(error instanceof TypeError);
});

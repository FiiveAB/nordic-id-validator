const test = require('ava');
const Validator = require('../src/index');
const { FI_VALID, FI_INVALID } = require('./fixtures');

const validator = new Validator();


FI_VALID.forEach(number => {
    test(`isValidFI: accepts '${number}'`, t => {
        t.true(validator.isValidFI(number));
    });
});

FI_INVALID.forEach(number => {
    test(`isValidFI: rejects '${number}'`, t => {
        t.false(validator.isValidFI(number));
    });
});


test('isValidFI: throws TypeError for non-string non-number input', t => {
    const error = t.throws(() => validator.isValidFI({}));
    t.true(error instanceof TypeError);
});


// ---------------------------------------------------------------------------
// HETU century separator: only the spec characters are accepted. The pipe
// character is not in the spec.
// ---------------------------------------------------------------------------

test('isValidFI: rejects pipe character as century separator', t => {
    t.false(validator.isValidFI('010594|9021'));
});

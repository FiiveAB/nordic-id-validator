/**
 * Tests for the Validator facade — the documented isValid(input, countryCode) API.
 *
 * Country-specific behavior lives in <country>-ssn.test.js. This file only
 * covers dispatching and the country-code error path.
 */

const test = require('ava');
const Validator = require('../src/index');

const validator = new Validator();


test('isValid: throws for invalid country code', t => {
    const error = t.throws(() => validator.isValid('860101-3496', 'XX'));
    t.is(
        error.message,
        'Invalid country code. Valid country codes are: SE, NO, DK, FI'
    );
});


[
    { code: 'SE', valid: '860101-3496',  invalid: '9815289072' },
    { code: 'NO', valid: '21103426631',  invalid: '99999999999' },
    { code: 'DK', valid: '0105949021',   invalid: '5050509030' },
    { code: 'FI', valid: '010594Y9021',  invalid: '290200-101P' },
].forEach(({ code, valid, invalid }) => {
    test(`isValid: dispatches to ${code} validator (valid input)`, t => {
        t.true(validator.isValid(valid, code));
    });

    test(`isValid: dispatches to ${code} validator (invalid input)`, t => {
        t.false(validator.isValid(invalid, code));
    });
});

const test = require('ava');
const Validator = require('../src/index');
const { SE_VALID, SE_INVALID } = require('./fixtures');

const validator = new Validator();


// ---------------------------------------------------------------------------
// Happy paths
// ---------------------------------------------------------------------------

SE_VALID.forEach(number => {
    test(`isValidSE: accepts '${number}'`, t => {
        t.true(validator.isValidSE(number));
    });
});

SE_INVALID.forEach(number => {
    test(`isValidSE: rejects '${number}'`, t => {
        t.false(validator.isValidSE(number));
    });
});


// ---------------------------------------------------------------------------
// Input types
// ---------------------------------------------------------------------------

test('isValidSE: accepts numeric input', t => {
    t.true(validator.isValidSE(8303239514));
});

test('isValidSE: numeric and string input give the same result', t => {
    t.is(
        validator.isValidSE(8303239514),
        validator.isValidSE('8303239514')
    );
});

test('isValidSE: throws TypeError for non-string non-number input', t => {
    const error = t.throws(() => validator.isValidSE({}));
    t.true(error instanceof TypeError);
    t.is(error.message, 'Expected a string or number, got object');
});


// ---------------------------------------------------------------------------
// Century resolution: a 10-digit SSN must resolve YY to the most recent
// sensible century, e.g. '850323' -> 1985, not 2085.
// ---------------------------------------------------------------------------

test('isValidSE: 10-digit SSN for person born in 1985 is valid', t => {
    t.true(validator.isValidSE('850323-3432'));
});


// ---------------------------------------------------------------------------
// Separator handling: only one hyphen, on the documented position
// (between birth date and serial). Stray hyphens are malformed input.
// ---------------------------------------------------------------------------

test('isValidSE: rejects input with stray hyphen in the middle', t => {
    t.false(validator.isValidSE('200-60528-5733'));
});

test('isValidSE: rejects input with hyphens at unexpected positions', t => {
    t.false(validator.isValidSE('2006-0528-5733'));
});

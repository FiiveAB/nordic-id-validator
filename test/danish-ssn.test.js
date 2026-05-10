const test = require('ava');
const Validator = require('../src/index');
const { DK_VALID, DK_INVALID } = require('./fixtures');

const validator = new Validator();


DK_VALID.forEach(number => {
    test(`isValidDK: accepts '${number}'`, t => {
        t.true(validator.isValidDK(number));
    });
});

DK_INVALID.forEach(number => {
    test(`isValidDK: rejects '${number}'`, t => {
        t.false(validator.isValidDK(number));
    });
});


test('isValidDK: throws TypeError for non-string non-number input', t => {
    const error = t.throws(() => validator.isValidDK({}));
    t.true(error instanceof TypeError);
});


// ---------------------------------------------------------------------------
// Separator handling: only one hyphen, on the documented position
// (between birth date and serial).
// ---------------------------------------------------------------------------

test('isValidDK: rejects input with hyphens at unexpected positions', t => {
    t.false(validator.isValidDK('03-0594-9031'));
});


// ---------------------------------------------------------------------------
// Mod-11 checksum: Denmark phased it out in 2007 and the package does not
// validate it. Skipped until we decide whether to (a) document this clearly
// or (b) add an opt-in mode for legacy numbers.
// ---------------------------------------------------------------------------

test.skip('isValidDK: rejects valid date with invalid mod-11 checksum', t => {
    t.false(validator.isValidDK('0105949020'));
});


// ---------------------------------------------------------------------------
// Numeric input is fragile because most DK numbers start with a leading zero
// (DDMMYY). 105949021 (9 digits) is rejected by length; if we ever pad to
// expected length, this test will fail and force a deliberate decision.
// ---------------------------------------------------------------------------

test('isValidDK: numeric input that lost a leading zero is rejected', t => {
    t.false(validator.isValidDK(105949021));
});

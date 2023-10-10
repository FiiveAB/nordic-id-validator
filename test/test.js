const test = require('ava');
const Validator = require('../index');

const validator = new Validator();


test('Validator.validatePersonalNumber validates correct numbers', t => {
  t.true(validator.validatePersonalNumber('860101-3496'));
  t.true(validator.validatePersonalNumber('980501-8257'));
  t.true(validator.validatePersonalNumber('9805289072'));
  t.true(validator.validatePersonalNumber('20060528-5733'));
  t.true(validator.validatePersonalNumber('780923-4011'));
  t.true(validator.validatePersonalNumber('871206-9841'));
  t.true(validator.validatePersonalNumber('19751013-7917'));
  t.true(validator.validatePersonalNumber('790402-0315'));
  t.true(validator.validatePersonalNumber('19780314-3184'));
  t.true(validator.validatePersonalNumber('831212-2354'));
  t.true(validator.validatePersonalNumber('8503233432'));
});

test('Validator.validatePersonalNumber rejects incorrect numbers', t => {
  t.false(validator.validatePersonalNumber('830323-789'));
  t.false(validator.validatePersonalNumber('19780332-3184'));
  t.false(validator.validatePersonalNumber('83032-7893'));
  t.false(validator.validatePersonalNumber('1983023-7893'));
  t.false(validator.validatePersonalNumber('791402-0315'));
  t.false(validator.validatePersonalNumber('790002-0315'));
  t.false(validator.validatePersonalNumber('1983032-7893'));
  t.false(validator.validatePersonalNumber('1983032-783'));
  t.false(validator.validatePersonalNumber(85023233432));
  t.false(validator.validatePersonalNumber('1983432-793'));

});




test('Validator.validatePersonalNumber handle number input', t => {
  t.true(validator.validatePersonalNumber(8303239514));
});

test('Validator.validatePersonalNumber throw TypeError for non-string non-number input', t => {
  const error = t.throws(() => {
    validator.validatePersonalNumber({});
  });
  t.true(error instanceof TypeError);
  t.is(error.message, 'Expected a string or number, got object');

});
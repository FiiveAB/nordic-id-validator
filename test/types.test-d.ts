/**
 * Type-level tests. Compiled with `tsc --noEmit` to verify the public types
 * in index.d.ts. No runtime assertions here.
 */

import Validator = require('../index');

const validator = new Validator();

// Methods return boolean
const a: boolean = validator.isValid('860101-3496', 'SE');
const b: boolean = validator.isValidSE('860101-3496');
const c: boolean = validator.isValidNO('21103426631');
const d: boolean = validator.isValidDK('0105949021');
const e: boolean = validator.isValidFI('010594Y9021');

// Number input is accepted
const f: boolean = validator.isValidSE(8303239514);

// Country code is constrained
validator.isValid('860101-3496', 'SE');
validator.isValid('860101-3496', 'NO');
validator.isValid('860101-3496', 'DK');
validator.isValid('860101-3496', 'FI');

// @ts-expect-error — unknown country code
validator.isValid('860101-3496', 'XX');

// @ts-expect-error — input must be string or number
validator.isValidSE({});

// @ts-expect-error — input must be string or number
validator.isValidSE(null);

// Suppress "declared but never read" warnings for the boolean assignments
void [a, b, c, d, e, f];

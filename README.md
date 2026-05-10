# nordic-id-validator

[![npm version](https://img.shields.io/npm/v/nordic-id-validator.svg)](https://www.npmjs.com/package/nordic-id-validator)
[![license](https://img.shields.io/npm/l/nordic-id-validator.svg)](./LICENSE)
[![node](https://img.shields.io/node/v/nordic-id-validator.svg)](https://nodejs.org)

Lightweight, zero-dependency validator for Nordic personal identification numbers (SSN / personnummer / fødselsnummer / CPR / HETU).

Supports **Sweden**, **Norway**, **Denmark**, and **Finland** with format, date, and checksum validation.

## Installation

```bash
npm install nordic-id-validator
```

## Quick start

```js
const Validator = require('nordic-id-validator');
const validator = new Validator();

validator.isValid('860101-3496', 'SE'); // true
validator.isValid('21103426631', 'NO'); // true
```

## Usage

### Generic API

Use `isValid(input, countryCode)` when the country is dynamic:

```js
validator.isValid('860101-3496', 'SE'); // true
validator.isValid('0105949021',  'DK'); // true
validator.isValid('010594Y9021', 'FI'); // true
```

### Country-specific API

Use the country-specific methods when the country is known up front:

```js
validator.isValidSE('860101-3496');  // Sweden
validator.isValidNO('21103426631');  // Norway
validator.isValidDK('0105949021');   // Denmark
validator.isValidFI('010594Y9021');  // Finland
```

## API

| Method                          | Returns   | Description                                   |
| ------------------------------- | --------- | --------------------------------------------- |
| `isValid(input, countryCode)`   | `boolean` | Validates against the given country code.     |
| `isValidSE(input)`              | `boolean` | Validates a Swedish personnummer.             |
| `isValidNO(input)`              | `boolean` | Validates a Norwegian fødselsnummer.          |
| `isValidDK(input)`              | `boolean` | Validates a Danish CPR-nummer.                |
| `isValidFI(input)`              | `boolean` | Validates a Finnish HETU.                     |

**Supported country codes:** `SE`, `NO`, `DK`, `FI`.

**Input types:** `string` (recommended) or `number`. Number input is supported for convenience but will silently drop leading zeros — prefer strings.

### Accepted formats

| Country | Length     | Example          | Separator                              |
| ------- | ---------- | ---------------- | -------------------------------------- |
| SE      | 10 digits  | `860101-3496`    | Optional `-` between date and serial.  |
| SE      | 12 digits  | `19860101-3496`  | Optional `-` between date and serial.  |
| NO      | 11 digits  | `21103426631`    | None.                                  |
| DK      | 10 digits  | `030594-9031`    | Optional `-` between date and serial.  |
| FI      | 11 chars   | `010594Y9021`    | Century marker is part of the format.  |

### Validation rules per country

- **Sweden** — length, date of birth, and Luhn check digit.
- **Norway** — length, date of birth, and both mod-11 check digits.
- **Denmark** — length and date of birth. The mod-11 checksum was phased out in 2007 and is **not** validated.
- **Finland** — HETU format, date of birth, and check character (modulo 31).

## Error handling

`isValid` throws on unknown country codes:

```js
try {
    validator.isValid('860101-3496', 'XX');
} catch (error) {
    console.error(error.message);
    // -> "Invalid country code. Valid country codes are: SE, NO, DK, FI"
}
```

All methods throw a `TypeError` if the input is neither a string nor a number:

```js
validator.isValidSE({}); // throws TypeError
```

Otherwise, validation returns `false` for malformed input — no exceptions for ordinary invalid numbers.

## Contributing

Issues and pull requests are welcome. Please include test cases for any new validation rules or bug fixes.

```bash
npm install
npm test
npm run lint
```

## License

[MIT](./LICENSE) — A project by [Fiive](https://www.fiive.se).

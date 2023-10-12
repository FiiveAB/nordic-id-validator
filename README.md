# Nordic ID Validator

**`Nordic-ID-Validator`** is a comprehensive toolkit for verifying Nordic personal identification numbers with accuracy and ease.

## Features

- Supports all major Nordic countries: Sweden, Norway, Denmark, and Finland.
- Provides both format and date validation.
- Lightweight with no external dependencies.

## Installation

Using npm:

```bash
npm install nordic-id-validator

```

## Usage

First, import the Validator class:

```jsx
const Validator = require('nordic-id-validator');

```

Next, create an instance of the Validator class:

```jsx
const validator = new Validator();

```

To validate a personal number, use the **`isValid`** method by passing the personal number and the respective country code:

```jsx
const isValid = validator.isValid('your_personal_number', 'SE'); // For Swedish numbers

```

Replace **`'your_personal_number'`** with the personal number you want to validate and **`'SE'`** with the respective country code. Valid country codes are:

- **`SE`** for Sweden
- **`NO`** for Norway
- **`DK`** for Denmark
- **`FI`** for Finland

Example:

```jsx
const isValidSwedish = validator.isValid('123456-7890', 'SE');
console.log(isValidSwedish); // true or false based on the validity

const isValidNorwegian = validator.isValid('12345678901', 'NO');
console.log(isValidNorwegian); // true or false based on the validity

```

## Error Handling

The **`isValid`** method will throw an error if an invalid country code is provided or if the input is neither a string nor a number:

```jsx
try {
    const isValid = validator.isValid('your_personal_number', 'INVALID_COUNTRY_CODE');
} catch (error) {
    console.error(error.message);
}

```

## Contribution

We welcome contributions! If you find a bug or have suggestions, please open an issue.

## License

MIT


A project by [Klarity](https://www.klarity.se).

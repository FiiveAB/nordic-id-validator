const { testNorwegianDate } = require("./general");

function isValidCheckDigit(staticSequence, elevenDigits) {
    const productSum = staticSequence.reduce(
        (acc, value, index) => acc + value * elevenDigits[index],
        0,
    );

    return productSum % 11 === 0;
}

function isValidCheckDigits(elevenDigits) {
    const staticSequenceFirstCheckDigit = [3, 7, 6, 1, 8, 9, 4, 5, 2, 1];
    const staticSequenceSecondCheckDigit = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2, 1];

    const elevenDigitsArray = elevenDigits.split('').map(Number);

    return (
        isValidCheckDigit(staticSequenceFirstCheckDigit, elevenDigitsArray) &&
        isValidCheckDigit(staticSequenceSecondCheckDigit, elevenDigitsArray)
    );
}

function noPersonalNumber(number) {
    return (
        // Length must be 11 digits
        number.length === 11 &&
        // Validate the date of birth
        testNorwegianDate(number) &&
        // Validate the check digit (Luhn algorithm)
        isValidCheckDigits(number)
    )
}

module.exports = noPersonalNumber;
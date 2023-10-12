const { testDanishDate } = require("./general");

function dkPersonalNumber(number) {
    return (
        // Length must be 10 digits
        number.length === 10 &&
        // Validate the date of birth
        testDanishDate(number)
        // Validate the check digit (Luhn algorithm)
        //teshLuhn(number)
    )
}

module.exports = dkPersonalNumber;
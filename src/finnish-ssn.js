const { testFinnishDate } = require("./general");

const checksumTable = '0123456789ABCDEFHJKLMNPRSTUVWXY'.split('')
const SSN_REGEX = /^(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])([5-9]\d\+|\d\d[-|U-Y]|[012]\d[A-F])\d{3}[\dA-Z]$/

function fiPersonalNumber(number) {
    if (!SSN_REGEX.test(number)) {
        return false
    }

    const rollingId = number.substring(7, 10)
    const checksum = number.substring(10, 11)
    const checksumBase = parseInt(number.substring(0, 6) + rollingId, 10)
    return (
        // Validate the check digit
        checksum === checksumTable[checksumBase % 31] &&
        // Validate the date of birth
        testFinnishDate(number)
    )
}

module.exports = fiPersonalNumber;
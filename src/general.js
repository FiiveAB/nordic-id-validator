const dayjs = require("dayjs")

/**
 * Helper function to validate the date part of a Swedish personal number.
 * @param {string} number 
 * @returns 
 */
function testSwedishDate(number) {
    let datePart = ""
    if (number.length === 10) {
        datePart = number.slice(0, 6)
    } else if (number.length === 12) {
        datePart = number.slice(0, 8)
    }

    const dateFormat = datePart.length === 6 ? 'YYMMDD' : 'YYYYMMDD';
    const dateIsValid = dayjs(datePart, dateFormat).isValid

    return dateIsValid
}

function testNorwegianDate(number) {
    let datePart = ""
    if (number.length === 11) {
        datePart = number.slice(0, 6)
    } else {
        return false
    }

    const dateFormat = 'DDMMYY'
    const dateIsValid = dayjs(datePart, dateFormat).isValid

    return dateIsValid
}

function testDanishDate(number) {
    let datePart = ""
    if (number.length === 11) {
        datePart = number.slice(0, 6)
    } else {
        return false
    }

    const dateFormat = 'DDMMYY'
    const dateIsValid = dayjs(datePart, dateFormat).isValid

    return dateIsValid
}

function testFinnishDate(number) {
    let datePart = ""
    if (number.length === 10) {
        datePart = number.slice(0, 6)
    } else {
        return false
    }

    const dateFormat = 'DDMMYY'
    const dateIsValid = dayjs(datePart, dateFormat).isValid

    return dateIsValid
}


/**
 * Helper function to validate the Luhn algorithm.
 * @param {String} number 
 * @returns 
 */
function teshLuhn(number) {
    //convert to 10 digit number
    if (number.length === 12) {
        number = number.slice(2, 12);
    }

    const idNumber = number.replace(/\D/g, "").split("");

    if (idNumber.length !== 10) {
        return false;
    }

    const result = idNumber
        .map((c, idx) => (idx % 2 === 0 ? +c * 2 : +c))
        .map(n => (n > 9 ? n - 9 : n))
        .reduce((acc, val) => acc + val);

    return result % 10 === 0;
}

export {
    testSwedishDate,
    testNorwegianDate,
    testDanishDate,
    testFinnishDate,
    teshLuhn
}
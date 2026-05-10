/**
 * Resolve a 2-digit year to a full 4-digit year, choosing the most recent
 * sensible century (within ~150 years of today). E.g. given current year 2026,
 * "85" -> 1985 and "20" -> 2020.
 */
function resolveTwoDigitYear(yy) {
    const currentYear = new Date().getFullYear();
    const currentCentury = Math.floor(currentYear / 100) * 100;

    let year = currentCentury + yy;
    if (year > currentYear) {
        year -= 100;
    }
    return year;
}


/**
 * Validate a date string against a format.
 * Supported tokens: YYYY, YY, MM, DD. Tokens may appear in any order; the
 * format string and the date string must have the same length.
 *
 * @param {string} dateString
 * @param {string} format
 * @returns {boolean}
 */
function isValidDate(dateString, format) {
    if (typeof dateString !== 'string' || typeof format !== 'string') {
        return false;
    }
    if (!/^\d+$/.test(dateString)) {
        return false;
    }
    if (dateString.length !== format.length) {
        return false;
    }

    const has4DigitYear = format.includes('YYYY');
    const yearIndex = has4DigitYear ? format.indexOf('YYYY') : format.indexOf('YY');
    const yearLength = has4DigitYear ? 4 : 2;
    const monthIndex = format.indexOf('MM');
    const dayIndex = format.indexOf('DD');

    if (yearIndex < 0 || monthIndex < 0 || dayIndex < 0) {
        return false;
    }

    const yearRaw = parseInt(dateString.substring(yearIndex, yearIndex + yearLength), 10);
    const month = parseInt(dateString.substring(monthIndex, monthIndex + 2), 10) - 1;
    const day = parseInt(dateString.substring(dayIndex, dayIndex + 2), 10);

    if (isNaN(yearRaw) || isNaN(month) || isNaN(day)) {
        return false;
    }

    const year = has4DigitYear ? yearRaw : resolveTwoDigitYear(yearRaw);

    const currentYear = new Date().getFullYear();
    if (currentYear - year > 150) {
        return false;
    }

    const date = new Date(year, month, day);
    return date.getFullYear() === year &&
        date.getMonth() === month &&
        date.getDate() === day;
}


function testSwedishDate(number) {
    let datePart = '';
    if (number.length === 10) {
        datePart = number.slice(0, 6);
    } else if (number.length === 12) {
        datePart = number.slice(0, 8);
    }

    const dateFormat = datePart.length === 6 ? 'YYMMDD' : 'YYYYMMDD';
    return isValidDate(datePart, dateFormat);
}

function testNorwegianDate(number) {
    if (number.length !== 11) return false;
    return isValidDate(number.slice(0, 6), 'DDMMYY');
}

function testDanishDate(number) {
    if (number.length !== 10) return false;
    return isValidDate(number.slice(0, 6), 'DDMMYY');
}

function testFinnishDate(number) {
    if (number.length !== 11) return false;
    return isValidDate(number.slice(0, 6), 'DDMMYY');
}


/**
 * Validate the Luhn check digit. For Swedish 12-digit input, the leading
 * 4-digit year is reduced to a 2-digit year before applying Luhn (per spec).
 *
 * @param {string} number
 * @returns {boolean}
 */
function testLuhn(number) {
    if (number.length === 12) {
        number = number.slice(2, 12);
    }

    const idNumber = number.replace(/\D/g, '').split('');
    if (idNumber.length !== 10) {
        return false;
    }

    const sum = idNumber
        .map((c, idx) => (idx % 2 === 0 ? +c * 2 : +c))
        .map(n => (n > 9 ? n - 9 : n))
        .reduce((acc, val) => acc + val);

    return sum % 10 === 0;
}


module.exports = {
    testSwedishDate,
    testNorwegianDate,
    testDanishDate,
    testFinnishDate,
    testLuhn,
    teshLuhn: testLuhn, // back-compat alias for the original typo
    isValidDate,
};


/**
 * Helper function to validate a date string.
 * @param {string} dateString - The date string to validate.
 * @param {string} format - The expected format of the date string.
 * @returns {boolean} - True if the date is valid, false otherwise.
 */
function isValidDate(dateString, format) {
    if (!/^\d+$/.test(dateString)) {
        return false;
    }

    if (dateString.length !== format.length) {
        return false;
    }

    try {
        const currentYear = new Date().getFullYear();
        const yearIndex = format.indexOf('YYYY') >= 0 ? format.indexOf('YYYY') : format.indexOf('YY');
        const yearLength = format.indexOf('YYYY') >= 0 ? 4 : 2;
        const monthIndex = format.indexOf('MM');
        const dayIndex = format.indexOf('DD');
    
        let year = yearLength === 4 ? parseInt(dateString.substring(yearIndex, yearIndex + 4), 10) :
        parseInt(dateString.substring(yearIndex, yearIndex + 2), 10) + 2000;

        // Check if the year is more than 150 years old
        if (currentYear - year > 150) {
            return false;
        }

        const month = parseInt(dateString.substring(monthIndex, monthIndex + 2), 10) - 1; // month is 0-indexed
        const day = parseInt(dateString.substring(dayIndex, dayIndex + 2), 10);
    
        if (year === null || isNaN(month) || isNaN(day)) return false;
    
        const date = new Date(year, month, day);
        return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
    }  
    catch (error) {
        return false;
    }
}


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
    return isValidDate(datePart, dateFormat);
}

function testNorwegianDate(number) {
    let datePart = ""
    if (number.length === 11) {
        datePart = number.slice(0, 6)
    } else {
        return false
    }

    const dateFormat = 'DDMMYY'
    return isValidDate(datePart, dateFormat)
}

function testDanishDate(number) {
    let datePart = ""
    if (number.length === 10) {
        datePart = number.slice(0, 6)
    } else {
        return false
    }

    const dateFormat = 'DDMMYY'
    return isValidDate(datePart, dateFormat)
}

function testFinnishDate(number) {
    let datePart = ""
    if (number.length === 11) {
        datePart = number.slice(0, 6)
    } else {
        return false
    }    

    const dateFormat = 'DDMMYY'
    return isValidDate(datePart, dateFormat)
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

module.exports = {
    testSwedishDate,
    testNorwegianDate,
    testDanishDate,
    testFinnishDate,
    teshLuhn,
    isValidDate
}
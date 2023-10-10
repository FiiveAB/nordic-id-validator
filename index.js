const dayjs = require("dayjs")

/**
 * This file contains the Validator class, which is used to validate Nordic personal numbers.
 */


/**
 * Helper function to validate the date part of a Swedish personal number.
 * @param {string} number 
 * @returns 
 */
function testDate(number) {
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


/**
 * Helper function to validate a Swedish personal number.
 * @param {string} number - The personal number to validate.
 */
function checkPersonalNumber(number) {
    return (
        // Length must be 10 or 12 digits
        (number.length === 10 || number.length === 12) &&
        // Validate the date of birth
        testDate(number) &&
        // Validate the check digit (Luhn algorithm)
        teshLuhn(number)
    )
}

/**
 * Class for validating Swedish personal numbers and company registration numbers.
 * @class Validator
 */
class Validator {
 

    /**
     * Validates a Swedish personal number.
     * @param {(string|number)} input - The personal number to validate.
     * @throws {TypeError} - If the input is not a string or a number.
     * @return {boolean} - Whether the personal number is valid.
     * 
     */
    validatePersonalNumber(input) {
        if (typeof input === 'string') {
            const normalized = input.replace(/\D/g, '')
            return checkPersonalNumber(normalized)

        } else if (typeof input === 'number') {
            const normalized = '' + input
            return checkPersonalNumber(normalized)
        } else {
            throw new TypeError(`Expected a string or number, got ${typeof input}`)
        }
    }
}

module.exports = Validator;
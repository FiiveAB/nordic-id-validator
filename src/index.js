const svPersonalNumber = require("./swedish-ssn");
const dkPersonalNumber = require("./dannish-ssn");
const noPersonalNumber = require("./norwegian-ssn");
const fiPersonalNumber = require("./finnish-ssn");

/**
 * Class for validating Swedish personal numbers and company registration numbers.
 * @class Validator
 */
class Validator {

    /**
     * Returns whether the input is a valid personal ID or not.
     * @param {string|number} input - The personal number to validate.
     * @param {string} countryCode - The country code to validate against.
     * @returns {boolean|Error}
     */
    isValid(input, countryCode) {
        switch (countryCode) {
            case 'SE':
                return this.isValidSE(input)
            case 'NO':
                return this.isValidNO(input)
            case 'DK':
                return this.isValidDK(input)
            case 'FI':
                return this.isValidFI(input)
            default:
                throw new Error('Invalid country code. Valid country codes are: SE, NO, DK, FI')
        }
    }

    /**
     * Validates a Swedish personal number.
     * @param {(string|number)} input - The personal number to validate.
     * @throws {TypeError} - If the input is not a string or a number.
     * @return {boolean} - Whether the social security number is valid or not.
     * 
     */
    isValidSE(input) {
        if (typeof input === 'string') {
            const normalized = input.replace('-', '').trim()
            return svPersonalNumber(normalized)

        } else if (typeof input === 'number') {
            const normalized = '' + input
            return svPersonalNumber(normalized)
        } else {
            throw new TypeError(`Expected a string or number, got ${typeof input}`)
        }
    }

    /**
     * Validates a Norwegian personal number.
     * @param {string} input - The personal number to validate.
     * @return {boolean} - Whether the social security number is valid or not.
     */
    isValidNO(input) {
        if (typeof input === 'string') {
            const normalized = input.trim()
            return noPersonalNumber(normalized)

        } else if (typeof input === 'number') {
            const normalized = '' + input
            return noPersonalNumber(normalized)
        } else {
            throw new TypeError(`Expected a string or number, got ${typeof input}`)
        }
    }

    /**
     * Validates a Danish personal number.
     * @param {string} input - The personal number to validate.
     * @return {boolean} - Whether the social security number is valid or not.
     */
    isValidDK(input) {
        if (typeof input === 'string') {
            const normalized = input.replace('-', '').trim()
            
            return dkPersonalNumber(normalized)

        } else if (typeof input === 'number') {
            const normalized = '' + input
            return dkPersonalNumber(normalized)
        } else {
            throw new TypeError(`Expected a string or number, got ${typeof input}`)
        }
    }

    /**
    * Validates a Finnish personal number.
    * @param {string} input - The personal number to validate.
    * @return {boolean} - Whether the social security number is valid or not.
    */
    isValidFI(input) {
        if (typeof input === 'string') {
            const normalized = input.trim()
            return fiPersonalNumber(normalized)

        } else if (typeof input === 'number') {
            const normalized = '' + input
            return fiPersonalNumber(normalized)
        } else {
            throw new TypeError(`Expected a string or number, got ${typeof input}`)
        }
    }
}

module.exports = Validator;
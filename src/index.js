const svPersonalNumber = require("./swedish-ssn");
const dkPersonalNumber = require("./danish-ssn");
const noPersonalNumber = require("./norwegian-ssn");
const fiPersonalNumber = require("./finnish-ssn");


/**
 * Strip an optional separator from a number string. Accepts the input only if
 * any separator characters appear at the documented position(s); otherwise
 * returns null to signal a malformed input.
 *
 * @param {string} input - Trimmed input.
 * @param {RegExp} separator - Pattern of allowed separator characters.
 * @param {number[]} allowedPositions - Indices (in the digits-only string)
 *        where a single separator may appear.
 * @returns {string|null} - Digits-only string, or null if malformed.
 */
function stripSeparator(input, separator, allowedPositions) {
    const digits = input.replace(separator, '');
    if (digits === input) {
        return digits;
    }

    // Reconstruct: where in `input` did separators appear, mapped to digit index?
    let digitIndex = 0;
    for (let i = 0; i < input.length; i++) {
        const ch = input[i];
        if (separator.test(ch)) {
            if (!allowedPositions.includes(digitIndex)) {
                return null;
            }
        } else {
            digitIndex++;
        }
        separator.lastIndex = 0;
    }
    return digits;
}

/**
 * Class for validating Nordic personal identification numbers.
 * @class Validator
 */
class Validator {

    /**
     * Returns whether the input is a valid personal ID or not.
     * @param {string|number} input - The personal number to validate.
     * @param {string} countryCode - The country code to validate against.
     * @returns {boolean}
     * @throws {Error} If the country code is unknown.
     * @throws {TypeError} If the input type is unsupported.
     */
    isValid(input, countryCode) {
        switch (countryCode) {
            case 'SE': return this.isValidSE(input);
            case 'NO': return this.isValidNO(input);
            case 'DK': return this.isValidDK(input);
            case 'FI': return this.isValidFI(input);
            default:
                throw new Error('Invalid country code. Valid country codes are: SE, NO, DK, FI');
        }
    }

    isValidSE(input) {
        const raw = coerceToString(input);
        // SE: hyphen between birth date and serial. Position 6 (10-digit form)
        // or position 8 (12-digit form).
        const stripped = stripSeparator(raw.trim(), /-/g, [6, 8]);
        if (stripped === null) return false;
        return svPersonalNumber(stripped);
    }

    isValidNO(input) {
        const raw = coerceToString(input).trim();
        // NO: no separators are documented. Reject any non-digits early.
        if (!/^\d+$/.test(raw)) return false;
        return noPersonalNumber(raw);
    }

    isValidDK(input) {
        const raw = coerceToString(input);
        // DK: hyphen between birth date and serial at position 6.
        const stripped = stripSeparator(raw.trim(), /-/g, [6]);
        if (stripped === null) return false;
        return dkPersonalNumber(stripped);
    }

    isValidFI(input) {
        const raw = coerceToString(input).trim();
        return fiPersonalNumber(raw);
    }
}


/**
 * Coerce string|number input to string. Throws TypeError for other types.
 */
function coerceToString(input) {
    if (typeof input === 'string') return input;
    if (typeof input === 'number') return String(input);
    throw new TypeError(`Expected a string or number, got ${typeof input}`);
}


module.exports = Validator;

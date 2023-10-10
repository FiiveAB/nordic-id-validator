import { testSwedishDate, teshLuhn } from "./general";

/**
 * Helper function to validate a Swedish personal number.
 * @param {string} number - The personal number to validate.
 */
export default function svPersonalNumber(number) {
    return (
        // Length must be 10 or 12 digits
        (number.length === 10 || number.length === 12) &&
        // Validate the date of birth
        testSwedishDate(number) &&
        // Validate the check digit (Luhn algorithm)
        teshLuhn(number)
    )
}
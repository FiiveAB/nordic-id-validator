import { testDate, teshLuhn } from "./general";

export default function noPersonalNumber(number) {
    return (
        // Length must be 11 digits
        number.length === 11 &&
        // Validate the date of birth
        testDate(number) &&
        // Validate the check digit (Luhn algorithm)
        teshLuhn(number)
    )
}
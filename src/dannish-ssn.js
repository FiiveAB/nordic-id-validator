import { testDate, teshLuhn } from "./general";

export default function dkPersonalNumber(number) {
    return (
        // Length must be 10 digits
        number.length === 10 &&
        // Validate the date of birth
        testDate(number)
        // Validate the check digit (Luhn algorithm)
        //teshLuhn(number)
    )
}
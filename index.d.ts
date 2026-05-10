/**
 * Type definitions for nordic-id-validator.
 */

export type CountryCode = 'SE' | 'NO' | 'DK' | 'FI';

export type ValidatorInput = string | number;

/**
 * Validator for Nordic personal identification numbers.
 *
 * Supports Sweden, Norway, Denmark, and Finland with format, date, and
 * checksum validation (where applicable).
 */
declare class Validator {
    /**
     * Validate an input against the given country code.
     *
     * @param input       The personal number to validate.
     * @param countryCode One of `SE`, `NO`, `DK`, `FI`.
     * @returns `true` if the input is a valid personal number for the country.
     * @throws  {Error}     If the country code is unknown.
     * @throws  {TypeError} If the input is neither a string nor a number.
     */
    isValid(input: ValidatorInput, countryCode: CountryCode): boolean;

    /**
     * Validate a Swedish personnummer (10 or 12 digits, optional `-` separator).
     * @throws {TypeError} If the input is neither a string nor a number.
     */
    isValidSE(input: ValidatorInput): boolean;

    /**
     * Validate a Norwegian fødselsnummer (11 digits, no separator).
     * @throws {TypeError} If the input is neither a string nor a number.
     */
    isValidNO(input: ValidatorInput): boolean;

    /**
     * Validate a Danish CPR-nummer (10 digits, optional `-` separator).
     * Note: the mod-11 checksum was phased out in 2007 and is not validated.
     * @throws {TypeError} If the input is neither a string nor a number.
     */
    isValidDK(input: ValidatorInput): boolean;

    /**
     * Validate a Finnish HETU (11 characters including century marker).
     * @throws {TypeError} If the input is neither a string nor a number.
     */
    isValidFI(input: ValidatorInput): boolean;
}

export = Validator;

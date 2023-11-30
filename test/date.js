const test = require('ava');
const {isValidDate} = require('../src/general')


const validDateTest = (format, validDates) => {
    validDates.forEach(date => {
        test(`isValidDate validates '${date}' in ${format} format`, t => {
            t.true(isValidDate(date, format));
        });
    });

};

const invalidDateTest = (format, invalidDates) => {
    invalidDates.forEach(date => {
        test(`isValidDate invalidates '${date}' in ${format} format`, t => {
            t.false(isValidDate(date, format));
        });
    });
}

validDateTest('YYMMDD', [
    '010101', // Start of 20th century
    '991231', // End of 20th century
    '210228', // Non-leap year
    '040229', // Leap year (February 29, 2004)
    '120831', // End of August (August 31, 2012)
    '871231', // End of year (December 31, 1987)
    '980101', // Start of year (January 1, 1998)
    '561212', // Mid-20th century (December 12, 1956)
    '731107', // Random date (November 7, 1973)
    '880229', // Leap year (February 29, 1988)
    '991101', // Start of November (November 1, 1999)
    '010430', // End of April (April 30, 2001)
    '030315', // Mid-March (March 15, 2003)
    '061231', // End of year (December 31, 2006)
]);

invalidDateTest('YYMMDD', [
    '010200', // Invalid day (February 0)
    '991332', // Invalid day (December 32)
    '970230', // Non-leap year (February 30, 1997)
    '890231', // Invalid day (February 31)
    '871399', // Invalid month (Month 13)
    '881500', // Invalid month (Month 15)
    '910000', // Invalid month and day (Month 00, Day 00)
    '920436', // Invalid day (April 36)
    '931131', // Invalid day (November 31)
    '940229', // Non-leap year (February 29, 1994)
    '952222', // Invalid day (February 22nd written as 222)
    '961367', // Invalid month and day (Month 13, Day 67)
    '982200', // Invalid day (February 00)
    '990000', // Invalid month and day (Month 00, Day 00)
    '001234', // Nonsensical date (Month 12, Day 34)
    '012345', // Sequential numbers, invalid date
    '020229', // Leap year (February 29, 2002, should be invalid if strict leap year checking is implemented)
]);


validDateTest('YYYYMMDD', [
    '19200101', // Start of 20th century
    '19991231', // End of 20th century
    '20210228', // Non-leap year
    '20000229', // Leap year (February 29, 2000)
    '20161231', // End of year (December 31, 2016)
    '19830715', // Mid-year (July 15, 1983)
    '20201010', // Specific date (October 10, 2020)
    '19120229', // Leap year (February 29, 1912)
    '19500831', // End of August (August 31, 1950)
    '19970228', // Non-leap year end of February (February 28, 1997)
    '20180704', // Specific date (July 4, 2018)
    '20300201', // Future date (February 1, 2030)
    '21001231', // Future end of year (December 31, 2100, non-leap year)
    '20010101', // Start of 21st century
    '20240229', // Future leap year (February 29, 2024)
]);


invalidDateTest('YYYYMMDD', [
    '19000001', // Invalid month (Month 00)
    '19991301', // Invalid month (Month 13)
    '20210229', // Non-leap year, invalid February 29
    '20211315', // Invalid month (Month 13)
    '20210230', // Invalid day (February 30)
    '20211131', // Invalid day (November 31)
    '20220001', // Invalid month (Month 00)
    '20221401', // Invalid month (Month 14)
    '20000230', // Leap year but invalid day (February 30)
    '20190229', // Non-leap year, invalid February 29
    '20210200', // Invalid day (Day 00)
    '19890231', // Invalid day (February 31)
    '20181232', // Invalid day (December 32)
    '20150020', // Invalid year (Year 2015 is repeated)
    '18991232', // Invalid day (December 32 in 1899)
    // Add more invalid dates as needed
]);

validDateTest('DDMMYY', [
    '010100', // Start of 20th century
    '311299', // End of 20th century
    '280221', // Non-leap year
    '290400', // Leap year (February 29, 2004)
    '310398', // End of March (March 31, 1998)
    '150786', // Mid-year (July 15, 1986)
    '070985', // Random valid date (September 7, 1985)
    '241299', // Christmas Eve, 1999
    '311200', // End of year (December 31, 2000)
    '010101', // Start of 21st century
    '290800', // Leap year (February 29, 2000)
    // Add more valid dates as needed
]);



invalidDateTest('DDMMYY', [
    '000101', // Invalid day (Day 00)
    '320199', // Invalid day (Day 32)
    '310299', // Non-leap year, invalid February 31
    '310400', // Invalid day (April 31)
    '311113', // Invalid month (Month 13)
    '311500', // Invalid month (Month 15)
    '290299', // Non-leap year, invalid February 29
    '321000', // Invalid month (Month 10 with invalid day)
    '321212', // Invalid day (December 32)
    '000000', // Invalid date (Month 00, Day 00)
    '290201', // Non-leap year, invalid February 29, 2001
    '311399', // Invalid month (Month 10 with invalid day)
    
]);


// Invalid Input Format Tests
invalidDateTest('YYDDMM', [
    '01a501', // Invalid format
    '123b01', // Invalid format
    null,
    23232,
    NaN,
    980123,
    {},
    []
]);
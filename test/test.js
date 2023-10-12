const test = require('ava');
const Validator = require('../src/index');

const validator = new Validator();

//Tests for swedish personal numbers
test('Validator.isValidSE validates correct numbers', t => {
  t.true(validator.isValidSE('860101-3496'));
  t.true(validator.isValidSE('980501-8257'));
  t.true(validator.isValidSE('9805289072'));
  t.true(validator.isValidSE('20060528-5733'));
  t.true(validator.isValidSE('780923-4011'));
  t.true(validator.isValidSE('871206-9841'));
  t.true(validator.isValidSE('19751013-7917'));
  t.true(validator.isValidSE('790402-0315'));
  t.true(validator.isValidSE('19780314-3184'));
  t.true(validator.isValidSE('831212-2354'));
  t.true(validator.isValidSE('8503233432'));
});

test('Validator.isValidSE rejects incorrect numbers', t => {
  t.false(validator.isValidSE('830323-789'));
  t.false(validator.isValidSE('19780332-3184'));
  t.false(validator.isValidSE('83032-7893'));
  t.false(validator.isValidSE('1983023-7893'));
  t.false(validator.isValidSE('9815289072'));
  t.false(validator.isValidSE('791402-0315'));
  t.false(validator.isValidSE('790002-0315'));
  t.false(validator.isValidSE('1983032-7893'));
  t.false(validator.isValidSE('1983032-783'));
  t.false(validator.isValidSE(85023233432));
  t.false(validator.isValidSE('1983432-793'));

});


test('Validator.isValidSE handle number input', t => {
  t.true(validator.isValidSE(8303239514));
});

test('Validator.isValidSE throw TypeError for non-string non-number input', t => {
  const error = t.throws(() => {
    validator.isValidSE({});
  });
  t.true(error instanceof TypeError);
  t.is(error.message, 'Expected a string or number, got object');

});




//Tests for norwegian personal numbers
const invalid = [
  '99999999999',
  '12345678900',
  '21103426632',
  '16015015435',
  '10089338788',
  '03071888089',
  '18182135460',
  '19081470751',
  '24101539581',
  '13127448172',
  '32091402864',
]

const valid = [
  '21103426631',
  '16015014435',
  '10088338788',
  '03061888089',
  '18082135460',
  '19081470750',
  '24101539551',
  '13127448072',
  '29091402864',
  '19040518226',
  '26085638318',
  '24081379633',
  '27104432382',
  '21038813991',
  '12101941262',
  '16114849387',
  '19120911360',
  '25013649068',
  '15089026684',
  '04040799945',
  '26075005015',
  '19098502206',
  '09058419114',
  '22098347481',
  '21080120068',
  '20068608067',
  '13077020637',
  '22074310331',
  '11051072806',
  '07081013041',
  '03032518973',
  '02028545935',
  '23094331331',
  '23046804805',
  '19080941784',
  '19051777126',
  '03050921521',
  '21023825187',
  '30125723191',
  '03078702787',
  '01101269538',
  '25127524419',
  '03018931469',
  '28075407825',
  '18080632785',
  '03125819590',
  '18020789162',
  '15014841609',
  '06111760509',
  '05031155268',
  '04018006419',
  '02022076844',
  '01094027248',
  '26012004035',
  '28119633925',
  '12036517881',
  '24120185299',
  '24100726536',
  '11040987896',
  '09086010337',
  '31038004746',
  '19104808479',
  '14120704851',
  '12066613699',
  '11081437523',
  '11028733692',
  '31018904481',
  '29072414886',
  '01099124071',
  '01058917024',
  '07091474128',
  '17039543222',
  '10124837702',
  '02120716533',
  '30054320589',
  '26017807403',
  '29016210976',
  '15129956558',
  '16081667296',
  '23115346156',
  '13015520382',
  '02091741302',
  '23103836050',
  '27036020666',
  '17013608997',
  '23126827199',
  '11082127021',
  '02066825461',
  '28079230997',
  '29111218593',
  '17078314613',
  '10120176426',
  '13029329251',
  '02037643745',
  '26046209531',
  '27053737396',
  '18114539178',
  '23070090317',
  '14089547882',
  '16032418930'
]

test('Validator.isValidNO validates correct numbers', t => {
  valid.forEach(number => {
    t.true(validator.isValidNO(number));
  });

  invalid.forEach(number => {
    t.false(validator.isValidNO(number));
  });
});




//test for finnish personal numbers
const validFi = [
  '010594Y9021',
  '020594X903P',
  '020594X902N',
  '030594W903B',
  '030694W9024',
  '040594V9030',
  '040594V902Y',
  '050594U903M',
  '050594U902L',
  '010516B903X',
  '010516B902W',
  '020516C903K',
  '020516C902J',
  '030516D9037',
  '030516D9026',
  '010501E9032',
  '020502E902X',
  '020503F9037',
  '020504A902E',
  '020504B904H',
  '010594Y9032',
]

const notValidFi = ['01011995+433X',
  '01015+433X',
  '010195+4433X',
  '010195+33X',
  '290200-101P',
]


test('Validator.isValidFI validates correct numbers', t => {

  validFi.forEach(number => {
    t.true(validator.isValidFI(number));
  });

  notValidFi.forEach(number => {
    t.false(validator.isValidFI(number));
  });
  
})


const validDk = [
  '0105949021',
  '0305949031',
  '030594-9031',
  '0312949031',

]

const notValidDk = [
  '5050509030',
  '010594902',
  '01059490211',
  '13059490211',
]


test('Validator.isValidDK validates correct numbers', t => {

  validDk.forEach(number => {
    t.true(validator.isValidDK(number));
  });

  notValidDk.forEach(number => {
    t.false(validator.isValidDK(number));
  });
  
})
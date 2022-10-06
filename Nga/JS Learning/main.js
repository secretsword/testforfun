const SOCIAL_INSURANCE_RATE = 0.08;
const MEDICAL_INSURANCE_RATE = 0.015;
const UNEMPLOYMENT_INSURANCE_RATE = 0.01;
const BASE_SALARY = 1490000;
const MAX_SALARY = BASE_SALARY * 20;

const MIN_SALARY_1 = 4420000;
const MIN_SALARY_2 = 3920000;
const MIN_SALARY_3 = 3430000;
const MIN_SALARY_4 = 3070000;

//PIT
const BASE_INCOME_TAX = 11000000;
const BASE_PIT_1 = 5000000;
const BASE_PIT_2 = 10000000;
const BASE_PIT_3 = 18000000;
const BASE_PIT_4 = 32000000;
const BASE_PIT_5 = 52000000;
const BASE_PIT_6 = 80000000;
const BASE_PIT_7 = 80000001;
const PIT_LEVEL_1 = 0.05;
const PIT_LEVEL_2 = 0.1;
const PIT_LEVEL_3 = 0.15;
const PIT_LEVEL_4 = 0.2;
const PIT_LEVEL_5 = 0.25;
const PIT_LEVEL_6 = 0.3;
const PIT_LEVEL_7 = 0.35;

function calculateNetSalary() {
  let salary = document.getElementById('salary').value;
  let region = document.getElementById('region').value;
  let dependency = document.getElementById('dependency').value;
  let netResult; // net salary need to calculate

  let socialInsurance = calculateSI(salary);
  let medicalInsurance = calculateMI(salary);
  let unemploymentInsurance = calculateUI(salary, region);

  //calculate PIT
  let incomeBeforeTax = calculateIBT(salary, socialInsurance, medicalInsurance, unemploymentInsurance);
  let incomeTax = calculateIT(incomeBeforeTax);
  let personalIncomeTaxLevel1 = calculatePIT1(incomeTax);
  let personalIncomeTaxLevel2 = calculatePIT2(incomeTax);
  let personalIncomeTaxLevel3 = calculatePIT3(incomeTax);
  let personalIncomeTaxLevel4 = calculatePIT4(incomeTax);
  let personalIncomeTaxLevel5 = calculatePIT5(incomeTax);
  let personalIncomeTaxLevel6 = calculatePIT6(incomeTax);
  let personalIncomeTaxLevel7 = calculatePIT7(incomeTax);

  // netResult = salary - bhxh - yte - thatnghiep - pit
  console.log(salary, socialInsurance, medicalInsurance, unemploymentInsurance, 
    incomeBeforeTax, incomeTax, personalIncomeTaxLevel1, personalIncomeTaxLevel2, personalIncomeTaxLevel3,
    personalIncomeTaxLevel4, personalIncomeTaxLevel5, personalIncomeTaxLevel6, personalIncomeTaxLevel7);
}

function calculateSI(salary) {
  if (salary > MAX_SALARY) {
    salary = MAX_SALARY;
  }
  let result = salary * SOCIAL_INSURANCE_RATE;

  return result;
}

function calculateMI(salary) {
  if (salary > MAX_SALARY) {
    salary = MAX_SALARY;
  }
  let result = salary * MEDICAL_INSURANCE_RATE;

  return result;
}

// calculate unemployment insurance
function calculateUI(salary, region) {
  let maxSalary;
  if (region == 1) {
    maxSalary = MIN_SALARY_1 * 20;
  }
  if (region == 2) {
    maxSalary = MIN_SALARY_2 * 20;
  }
  if (region == 3) {
    maxSalary = MIN_SALARY_3 * 20;
  }
  if (region == 4) {
    maxSalary = MIN_SALARY_4 * 20;
  }
  if (salary > maxSalary) {
    salary = maxSalary;
  }
  let result = salary * UNEMPLOYMENT_INSURANCE_RATE;

  return result;
}


// calculate income before tax
function calculateIBT(salary, socialInsurance, medicalInsurance, unemploymentInsurance) {
  let incomeBeforeTax = salary - socialInsurance - medicalInsurance - unemploymentInsurance;
  return incomeBeforeTax;
}


//calculate income tax
function calculateIT(incomeBeforeTax){
  let incomeTax = incomeBeforeTax - BASE_INCOME_TAX;
  return incomeTax < 0 ? 0 : incomeTax;
}

// calculate PIT
function calculatePIT1(incomeTax){
  let PIT_1;
  if (incomeTax <= BASE_PIT_1){
    PIT_1 = incomeTax * PIT_LEVEL_1;
  } else {
    PIT_1 = BASE_PIT_1 * PIT_LEVEL_1;
  }
  return PIT_1 <= 0 ? 0 : PIT_1;
}

function calculatePIT2(incomeTax){
  let PIT_2;
  if (incomeTax > BASE_PIT_1 && incomeTax <= BASE_PIT_2){
    PIT_2 = (incomeTax - BASE_PIT_1) * PIT_LEVEL_2;
  } else (incomeTax > BASE_PIT_2);{
    PIT_2 = (BASE_PIT_2 - BASE_PIT_1) * PIT_LEVEL_2;
  }
    return PIT_2 <= 0 ? 0 : PIT_2;
}

function calculatePIT3(incomeTax){
  let PIT_3;
  if (incomeTax > BASE_PIT_2 && incomeTax <= BASE_PIT_3){
    PIT_3 = (incomeTax - BASE_PIT_1 - (BASE_PIT_2 - BASE_PIT_1)) * PIT_LEVEL_3;
  } else(incomeTax > BASE_PIT_3);{
    PIT_3 = (BASE_PIT_3 - BASE_PIT_2) * PIT_LEVEL_3;
  }
    return PIT_3 <= 0 ? 0 : PIT_3;
}



function calculatePIT4(incomeTax) {
  let PIT_4;
  if (incomeTax > BASE_PIT_3 && incomeTax <= BASE_PIT_4 ){
    PIT_4 = (incomeTax - (BASE_PIT_1 + (BASE_PIT_2 - BASE_PIT_1) + (BASE_PIT_3 - BASE_PIT_2))) * PIT_LEVEL_4;
  } else (incomeTax > BASE_PIT_4); {
    PIT_4 = (BASE_PIT_4 - BASE_PIT_3) * PIT_LEVEL_4;
  }
    return PIT_4 <= 0 ? 0 : PIT_4;
}


function calculatePIT5(incomeTax) {
  let PIT_5;
  if (incomeTax > BASE_PIT_4 && incomeTax <= BASE_PIT_5 ){
    PIT_5 = (incomeTax - BASE_PIT_1 - (BASE_PIT_2 - BASE_PIT_1) - (BASE_PIT_3 - BASE_PIT_2) - (BASE_PIT_4 - BASE_PIT_3)) * PIT_LEVEL_5;
  } else (incomeTax > BASE_PIT_5 && incomeTax < BASE_PIT_5); {
    PIT_5 = (BASE_PIT_5 - BASE_PIT_4) * PIT_LEVEL_5;
  }
    return PIT_5 <= 0 ? 0 : PIT_5;
}


function calculatePIT6(incomeTax) {
  let PIT_6;
  if (incomeTax > BASE_PIT_5 && incomeTax <= BASE_PIT_6 ){
    PIT_6 = (incomeTax - BASE_PIT_1 - (BASE_PIT_2 - BASE_PIT_1) - (BASE_PIT_3 - BASE_PIT_2) - (BASE_PIT_4 - BASE_PIT_3) - (BASE_PIT_5 - BASE_PIT_4)) * PIT_LEVEL_6;
  } else (incomeTax > BASE_PIT_6 && incomeTax < BASE_PIT_6);{
    PIT_6 = (BASE_PIT_6 - BASE_PIT_5) * PIT_LEVEL_6;
  }
    return PIT_6 < 0 ? 0 : PIT_6;
}


function calculatePIT7(incomeTax) {
  let PIT_7;
  if (incomeTax > BASE_PIT_7 ){
    PIT_7 = (incomeTax - BASE_PIT_1 - (BASE_PIT_2 - BASE_PIT_1) - (BASE_PIT_3 - BASE_PIT_2) - (BASE_PIT_4 - BASE_PIT_3) - (BASE_PIT_5 - BASE_PIT_4) - (BASE_PIT_6 - BASE_PIT_5)) * PIT_LEVEL_7;
  } else (incomeTax > BASE_PIT_4 && incomeTax < BASE_PIT_4);
    return PIT_7 < 0 ? 0 : PIT_7;
}

module.exports = {
  calculateSI, calculateMI, calculateUI
}
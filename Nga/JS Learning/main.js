const SOCIAL_INSURANCE_RATE = 0.08;
const MEDICAL_INSURANCE_RATE = 0.015;
const UNEMPLOYMENT_INSURANCE_RATE = 0.01;
const BASE_SALARY = 1490000;
const MAX_SALARY = BASE_SALARY * 20;

const MIN_SALARY_1 = 4420000;
const MIN_SALARY_2 = 3920000;
const MIN_SALARY_3 = 3430000;
const MIN_SALARY_4 = 3070000;

//PIT RANGE
const BASE_INCOME_TAX = 11000000;
const LEVEL_1 = 5000000;     
const LEVEL_2 = 10000000;     
const LEVEL_3 = 18000000;  
const LEVEL_4 = 32000000;    
const LEVEL_5 = 52000000;   
const LEVEL_6 = 80000000;  

// PIT_RATE
const RATE_1 = 0.05;
const RATE_2 = 0.1;
const RATE_3 = 0.15;
const RATE_4 = 0.2;
const RATE_5 = 0.25;
const RATE_6 = 0.3;
const RATE_7 = 0.35;


//MAX PIT
const MAX_PIT_1 = LEVEL_1 * RATE_1;
const MAX_PIT_2 = (LEVEL_2 - LEVEL_1) * RATE_2;
const MAX_PIT_3 = (LEVEL_3 - LEVEL_2) * RATE_3;
const MAX_PIT_4 = (LEVEL_4 - LEVEL_3) * RATE_4;
const MAX_PIT_5 = (LEVEL_5 - LEVEL_4) * RATE_5;
const MAX_PIT_6 = (LEVEL_6 - LEVEL_5) * RATE_6;


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
  let taxIncome = calculateTI(incomeBeforeTax);
  let personalTaxIncome1 = calculatePIT1(taxIncome);
  let personalTaxIncome2 = calculatePIT2(taxIncome);
  let personalTaxIncome3 = calculatePIT3(taxIncome);
  let personalTaxIncome4 = calculatePIT4(taxIncome);
  let personalTaxIncome5 = calculatePIT5(taxIncome);
  let personalTaxIncome6 = calculatePIT6(taxIncome);
  let personalTaxIncome7 = calculatePIT7(taxIncome);

  // netResult = salary - bhxh - yte - thatnghiep - pit
  console.log(salary, socialInsurance, medicalInsurance, unemploymentInsurance, incomeBeforeTax, taxIncome, personalTaxIncome1,
    personalTaxIncome2, personalTaxIncome3, personalTaxIncome4, personalTaxIncome5, personalTaxIncome6, personalTaxIncome7);
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


//calculate tax income
function calculateTI(incomeBeforeTax){
  let taxIncome = incomeBeforeTax - BASE_INCOME_TAX;
  return taxIncome < 0 ? 0 : taxIncome;
}

// calculate PIT
function calculatePIT1 (taxIncome){
  let PIT_1;
  if (taxIncome <=0){
    return PIT_1 = 0;
  } 
  else if (taxIncome > 0 && taxIncome <= LEVEL_1){
    return PIT_1 = taxIncome * RATE_1;
  } 
  else if (taxIncome > LEVEL_1)
    return PIT_1 = MAX_PIT_1;
}

function calculatePIT2(taxIncome){
  let PIT_2;
  if (taxIncome <= LEVEL_1){
    return PIT_2 = 0;
  }
  else if (taxIncome > LEVEL_1 && taxIncome <= LEVEL_2){
    return PIT_2 = (taxIncome - LEVEL_1)*RATE_2;
  } 
  else if (taxIncome > LEVEL_2){
    return PIT_2 = MAX_PIT_2;
  }
}

function calculatePIT3(taxIncome){
  let PIT_3; 
  if (taxIncome <= LEVEL_2){
    return PIT_3 = 0;
  }
  else if (taxIncome > LEVEL_2 && taxIncome <= LEVEL_3){
    return PIT_3 = (taxIncome - LEVEL_2)*RATE_3;
  }
  else if (taxIncome > LEVEL_3){
    return PIT_3 = MAX_PIT_3;
  }
}

function calculatePIT4(taxIncome){
  let PIT_4;
  if (taxIncome <= LEVEL_3){
    return PIT_4 = 0;
  }
  else if (taxIncome > LEVEL_3 && taxIncome <= LEVEL_4){
    return PIT_4 = (taxIncome - LEVEL_3) *RATE_4;
  }
  else if (taxIncome > LEVEL_4){
    return PIT_4 = MAX_PIT_4;
  }
}

function calculatePIT5(taxIncome){
  let PIT_5;
  if (taxIncome <= LEVEL_4){
    return PIT_5 = 0;
  }
  else if (taxIncome >LEVEL_4 && taxIncome <= LEVEL_5){
    return PIT_5 = (taxIncome - LEVEL_4) *RATE_5;
  }
  else if (taxIncome > LEVEL_5){
    return PIT_5 = MAX_PIT_5;
  }
}

function calculatePIT6(taxIncome){
  let PIT_6;
  if (taxIncome <= LEVEL_5){
    return PIT_6 = 0;
  }
  else if (taxIncome >LEVEL_5 && taxIncome <= LEVEL_6){
    return PIT_6 = (taxIncome - LEVEL_5) * RATE_6;
  }
  else if (taxIncome > LEVEL_6){
    return PIT_6 = MAX_PIT_6;
  }
}

function calculatePIT7(taxIncome){
  let PIT_7;
  if (taxIncome <= LEVEL_6){
    return PIT_7 = 0;
  }
  else if (taxIncome > LEVEL_6){
    return PIT_7 = (taxIncome - LEVEL_6) * RATE_7;
  }
}


module.exports = {
  calculateSI, calculateMI, calculateUI
}
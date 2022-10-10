const SOCIAL_INSURANCE_RATE = 0.08;
const MEDICAL_INSURANCE_RATE = 0.015;
const UNEMPLOYMENT_INSURANCE_RATE = 0.01;
const BASE_SALARY = 1490000;
const MAX_SALARY = BASE_SALARY * 20;

const MIN_SALARY_1 = 4420000;
const MIN_SALARY_2 = 3920000;
const MIN_SALARY_3 = 3430000;
const MIN_SALARY_4 = 3070000;


// DEPENDENCY DEDUCTION
const PERSONAL_DEDUCTION = 11000000;
const DEPENDENCY_DEDUCTION = 4400000;

//PIT RANGE
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
  // display gross salary
  let salary = document.getElementById('salary').value;
  let grossSalary =  document.getElementById("gross-salary");
  grossSalary.classList.remove('display');
  document.getElementById("gross-salary").innerHTML = 'Gross Salary: ' + salary;


  let region = document.getElementById('region').value;


  // displa social insurance
  let socialInsurance = calculateSI(salary);
  let displaySocialInsurance = document.getElementById('social-insurance');
  displaySocialInsurance.classList.remove('display');
  document.getElementById("social-insurance").innerHTML = 'Social Insurance: ' + socialInsurance;


  // display medical insurance
  let medicalInsurance = calculateMI(salary);
  let displayMedicalInsurance = document.getElementById('medical-insurance');
  document.getElementById("medical-insurance").innerHTML = 'Medical Insurance: ' + medicalInsurance;
  displayMedicalInsurance.classList.remove('display');
  

  // display unemployment insurance
  let unemploymentInsurance = calculateUI(salary, region);
  let displayUnemploymentInsurance = document.getElementById('unemployment-insurance');
  document.getElementById('unemployment-insurance').innerHTML = 'Unemployment Insurance: ' + unemploymentInsurance;
  displayUnemploymentInsurance.classList.remove('display');


  // display income before tax
  let incomeBeforeTax = calculateIBT(salary, socialInsurance, medicalInsurance, unemploymentInsurance);
  let displayincomeBeforeTax = document.getElementById('income-before-tax');
  document.getElementById('income-before-tax').innerHTML = 'Income Before Tax: ' + incomeBeforeTax;
  displayincomeBeforeTax.classList.remove('display');


  // display dependency deduction
  let dependency = document.getElementById('dependency').value;
  let displayPersonalDeduction = document.getElementById('personal-deduction');
  document.getElementById('personal-deduction').innerHTML = 'Personal Deduction: ' + PERSONAL_DEDUCTION;
  displayPersonalDeduction.classList.remove('display');


  // display dependency deduction
  let dependencyDeduction = calculateDD(dependency);
  let displayDependencyDeduction = document.getElementById('dependency-deduction');
  document.getElementById('dependency-deduction').innerHTML = 'Dependency Deduction: ' + dependencyDeduction;
  displayDependencyDeduction.classList.remove('display');


  // Display tax income
  let taxIncome = calculateTI(incomeBeforeTax, dependencyDeduction);
  let displayTaxIncome = document.getElementById('tax-income');
  document.getElementById('tax-income').innerHTML = 'Tax Income: ' + taxIncome;
  displayTaxIncome.classList.remove('display');


  // display PIT1
  let personalTaxIncome1 = calculatePIT1(taxIncome);
  let displayPersonalTaxIncome1 = document.getElementById('pit-1');
  document.getElementById('pit-1').innerHTML = 'PIT Range to 5.000.000 VND: ' + personalTaxIncome1;
  displayPersonalTaxIncome1.classList.remove('display');


   // display PIT2
  let personalTaxIncome2 = calculatePIT2(taxIncome);
  let displayPersonalTaxIncome2 = document.getElementById('pit-2');
  document.getElementById('pit-2').innerHTML = 'PIT Range from 5.000.001 to 10.000.000 VND: ' + personalTaxIncome2;
  displayPersonalTaxIncome2.classList.remove('display');


   // display PIT3
  let personalTaxIncome3 = calculatePIT3(taxIncome);
  let displayPersonalTaxIncome3 = document.getElementById('pit-3');
  document.getElementById('pit-3').innerHTML = 'PIT Range from 10.000.000 to 18.000.000 VND: ' + personalTaxIncome3;
  displayPersonalTaxIncome3.classList.remove('display');


   // display PIT4
  let personalTaxIncome4 = calculatePIT4(taxIncome);
  let displayPersonalTaxIncome4 = document.getElementById('pit-4');
  document.getElementById('pit-4').innerHTML = 'PIT Range from 18.000.001 to 32.000.000 VND: ' + personalTaxIncome4;
  displayPersonalTaxIncome4.classList.remove('display');


   // display PIT5
  let personalTaxIncome5 = calculatePIT5(taxIncome);
  let displayPersonalTaxIncome5 = document.getElementById('pit-5');
  document.getElementById('pit-5').innerHTML = 'PIT Range from 32.000.001 to 52.000.000 VND: ' + personalTaxIncome5;
  displayPersonalTaxIncome5.classList.remove('display');


   // display PIT6
  let personalTaxIncome6 = calculatePIT6(taxIncome);
  let displayPersonalTaxIncome6 = document.getElementById('pit-6');
  document.getElementById('pit-6').innerHTML = 'PIT Range from 52.000.001 to 80.000.000 VND: ' + personalTaxIncome6;
  displayPersonalTaxIncome6.classList.remove('display');


   // display PIT7
  let personalTaxIncome7 = calculatePIT7(taxIncome);
  let displayPersonalTaxIncome7 = document.getElementById('pit-7');
  document.getElementById('pit-7').innerHTML = 'PIT Range from 80.000.001 VND: ' + personalTaxIncome7;
  displayPersonalTaxIncome7.classList.remove('display');


   // display PIT
  let personalTaxIncome = calculatePIT(personalTaxIncome1,personalTaxIncome2,personalTaxIncome3,personalTaxIncome4,personalTaxIncome5,personalTaxIncome6,personalTaxIncome7);
  let displayPersonalTaxtIcome = document.getElementById('personal-tax-income');
  document.getElementById('personal-tax-income').innerHTML = 'Personal Tax Income: ' + personalTaxIncome;
  displayPersonalTaxtIcome.classList.remove('display');

  // Display net salary
  let netSalary = calculateNS(salary, socialInsurance, medicalInsurance, unemploymentInsurance, personalTaxIncome);
  let displayNetSalary = document.getElementById('net-salary');
  document.getElementById('net-salary').innerHTML = 'Net Salary: ' + netSalary;
  displayNetSalary.classList.remove('display');


  // console log
  console.log(salary, socialInsurance, medicalInsurance, unemploymentInsurance, incomeBeforeTax, dependencyDeduction, taxIncome, personalTaxIncome, netSalary,
    personalTaxIncome1, personalTaxIncome2, personalTaxIncome3, personalTaxIncome4, personalTaxIncome5, personalTaxIncome6, personalTaxIncome7);
}

// calculate dependency deduction
function calculateDD(dependency){
  result = dependency * DEPENDENCY_DEDUCTION;
  return result < 0 ? 0 :result;
}

function calculateSI(salary) {
  if (salary > MAX_SALARY) {
    salary = MAX_SALARY;
  }
  let result = salary * SOCIAL_INSURANCE_RATE;

  return result;
}


// calculate medical insurance
function calculateMI(salary) {
  if (salary >= MAX_SALARY) {
   return result = MAX_SALARY * MEDICAL_INSURANCE_RATE;
  }
  else (salary < MAX_SALARY)
    return  result = salary * MEDICAL_INSURANCE_RATE;
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
function calculateTI(incomeBeforeTax,dependencyDeduction){
  let taxIncome = incomeBeforeTax - PERSONAL_DEDUCTION - dependencyDeduction;
  return taxIncome <= 0 ? 0 : taxIncome;
}

// calculate PIT
function calculatePIT(personalTaxIncome1,personalTaxIncome2,personalTaxIncome3,
  personalTaxIncome4,personalTaxIncome5,personalTaxIncome6,personalTaxIncome7)
{ let PIT;
  PIT = personalTaxIncome1 + personalTaxIncome2 + personalTaxIncome3 + personalTaxIncome4 + 
  personalTaxIncome5 + personalTaxIncome6 + personalTaxIncome7;
  return PIT < 0 ? 0:PIT;
  }

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
    return PIT_2 = (taxIncome - LEVEL_1) * RATE_2;
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
    return PIT_3 = (taxIncome - LEVEL_2) * RATE_3;
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
    return PIT_4 = (taxIncome - LEVEL_3) * RATE_4;
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

// calculate net salary
function calculateNS(salary, socialInsurance, medicalInsurance, unemploymentInsurance, personalTaxtIcome){
  let netSalary;
  netSalary = salary - socialInsurance - medicalInsurance - unemploymentInsurance - personalTaxtIcome;
  return netSalary;
}

// Show result on screen


module.exports = {
  calculateSI, calculateMI, calculateUI, calculateIBT, calculateDD, calculateTI, calculatePIT1, calculatePIT2, calculatePIT3
  ,calculatePIT4, calculatePIT5, calculatePIT6, calculatePIT7, calculatePIT, calculateNS
}
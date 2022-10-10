const SOCIAL_INSURANCE_RATE = 0.08;
const MEDICAL_INSURANCE_RATE = 0.015;
const UNEMPLOYMENT_INSURANCE_RATE = 0.01;
const BASE_SALARY = 1490000;
const MAX_SALARY = BASE_SALARY * 20;

const LIST_MIN_SALARY = [4420000, 3920000, 3430000, 3070000];

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

const LIST_PIT_RANGE = [0, 5000000, 10000000, 18000000, 32000000, 52000000, 80000000]
const LIST_PIT_RATE = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35]


//MAX PIT
const MAX_PIT_1 = LEVEL_1 * RATE_1;
const MAX_PIT_2 = (LEVEL_2 - LEVEL_1) * RATE_2;
const MAX_PIT_3 = (LEVEL_3 - LEVEL_2) * RATE_3;
const MAX_PIT_4 = (LEVEL_4 - LEVEL_3) * RATE_4;
const MAX_PIT_5 = (LEVEL_5 - LEVEL_4) * RATE_5;
const MAX_PIT_6 = (LEVEL_6 - LEVEL_5) * RATE_6;

function test () {
  calculatePITLevel()
}
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

  let pitByLevel = calculatePITLevel(taxIncome);
   // display PIT

  displayTaxLevel(pitByLevel);
  let personalTaxIncome = calculatePIT(...pitByLevel); // todo : need to pass pit 1->7
  let displayPersonalTaxtIcome = document.getElementById('personal-tax-income');
  document.getElementById('personal-tax-income').innerHTML = 'Personal Tax Income: ' + personalTaxIncome;
  displayPersonalTaxtIcome.classList.remove('display');

  // Display net salary
  let netSalary = calculateNS(salary, socialInsurance, medicalInsurance, unemploymentInsurance, personalTaxIncome);
  let displayNetSalary = document.getElementById('net-salary');
  document.getElementById('net-salary').innerHTML = 'Net Salary: ' + netSalary;
  displayNetSalary.classList.remove('display');
}

function displayTaxLevel (pitByLevel) {
  for (let i=0; i<pitByLevel.length; i++) {
    let pit = pitByLevel[i];
    let elementId = 'pit-' + Number(i + 1);
    let element = document.getElementById(elementId);
    document.getElementById(elementId).innerHTML = 'PIT Range from' + LIST_PIT_RANGE[i+1] + ' VND: ' + pit;
    element.classList.remove('display');
  }
}

// calculate dependency deduction
function calculateDD(dependency){
  let result = dependency * DEPENDENCY_DEDUCTION;
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
  region = Number(region)
  maxSalary = LIST_MIN_SALARY[region - 1] * 20;
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
  PIT = (personalTaxIncome1 || 0) + (personalTaxIncome2 || 0) + (personalTaxIncome3 || 0) + (personalTaxIncome4 || 0) +
  (personalTaxIncome5 || 0) + (personalTaxIncome6 || 0) + (personalTaxIncome7||0);
  return PIT < 0 ? 0: PIT;
  }

function calculatePITLevel (taxIncome){
  let result = []
  for (let i=0; i <= LIST_PIT_RANGE.length - 1; i++) {
    let range = LIST_PIT_RANGE[i];
    let nextRange = LIST_PIT_RANGE[i+1];
    let previousRange = LIST_PIT_RANGE[i-1];
    let rate = LIST_PIT_RATE[i];
    let taxIncomeByLevel = taxIncome;
    // console.log('rate and range ---> : ',range, nextRange, rate);
    if (taxIncomeByLevel >= range) {
      // 15tr
      // 0 -> 5tr rate: 0.05
      if (taxIncomeByLevel >= nextRange) {
        taxIncomeByLevel = nextRange - range;
      } else {
        taxIncomeByLevel = range - previousRange;
      }
      let pit = taxIncomeByLevel * rate;
      result.push(pit)
    }
  }

  console.log('result : ', result)
  return result;
}

// calculate net salary
function calculateNS(salary, socialInsurance, medicalInsurance, unemploymentInsurance, personalTaxtIcome){
  let netSalary;
  netSalary = salary - socialInsurance - medicalInsurance - unemploymentInsurance - personalTaxtIcome;
  return netSalary;
}

// Show result on screen


module.exports = {
  calculateSI, calculateMI, calculateUI, calculateIBT, calculateDD, calculateTI, calculatePIT, calculateNS
}
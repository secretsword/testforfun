const SOCIAL_INSURANCE_RATE = 0.08;
const MEDICAL_INSURANCE_RATE = 0.015;
const UNEMPLOYMENT_INSURANCE_RATE = 0.01;
const BASE_SALARY = 1490000;
const MAX_SALARY = BASE_SALARY * 20;

const MIN_SALARY_1 = 4420000;
const MIN_SALARY_2 = 3920000;
const MIN_SALARY_3 = 3430000;
const MIN_SALARY_4 = 3070000;

function calculateNetSalary() {
  let salary = document.getElementById('salary').value;
  let region = document.getElementById('region').value;
  let dependency = document.getElementById('dependency').value;
  let netResult; // net salary need to calculate

  let socialInsurance = calculateSI(salary);
  let medicalInsurance = calculateMI(salary);
  let unemploymentInsurance = calculateUI(salary, region);

  // netResult = salary - bhxh - yte - thatnghiep - pit
  console.log(salary, socialInsurance, medicalInsurance, unemploymentInsurance);
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

module.exports = {
  calculateSI, calculateMI, calculateUI
}
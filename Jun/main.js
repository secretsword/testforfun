const SOCIAL_INSURANCE_RATE = 0.08;
const MEDICAL_INSURANCE_RATE = 0.015;
const UNEMPLOYMENT_INSURANCE_RATE = 0.01;
const BASE_SALARY = 1490000;
const MAX_SALARY = BASE_SALARY * 20;

const MIN_SALARY_1 = 4420000;
const MIN_SALARY_2 = 3920000;
const MIN_SALARY_3 = 3430000;
const MIN_SALARY_4 = 3070000;

const TAXABLE_LEVEL_1 = 5000000
const TAXABLE_LEVEL_2 = 10000000
const TAXABLE_LEVEL_3 = 18000000
const TAXABLE_LEVEL_4 = 32000000
const TAXABLE_LEVEL_5 = 52000000
const TAXABLE_LEVEL_6 = 80000000

const TAX_RATE_1 = 0.05
const TAX_RATE_2 = 0.1
const TAX_RATE_3 = 0.15
const TAX_RATE_4 = 0.2
const TAX_RATE_5 = 0.25
const TAX_RATE_6 = 0.3
const TAX_RATE_7 = 0.35

const TAX_AMT_1 = 250000
const TAX_AMT_2 = 750000
const TAX_AMT_3 = 1950000
const TAX_AMT_4 = 4750000
const TAX_AMT_5 = 9750000
const TAX_AMT_6 = 18150000


function calculateNetSalary() {
  let salary = document.getElementById('salary').value;
  let region = document.getElementById('region').value;
  let numberOfPeople = document.getElementById('numberOfPeople').value;
  let netResult; // net salary need to calculate

  let socialInsurance = calculateSI(salary);
  let medicalInsurance = calculateMI(salary);
  let unemploymentInsurance = calculateUI(salary, region);
  let totalBeforeTax = salary - socialInsurance - medicalInsurance - unemploymentInsurance;
  let taxableAmt = calculateTS (totalBeforeTax, numberOfPeople);
  let personalIncomeTax = calculatePit(taxableAmt)

  // netResult = salary - bhxh - yte - thatnghiep - pit
  console.log(salary, socialInsurance, medicalInsurance, unemploymentInsurance,personalIncomeTax);
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
function calculatePit(taxableAmt) {
    let result;
    if (taxableAmt <= TAXABLE_LEVEL_1) {
        result = taxableAmt * TAX_RATE_1;
    }
    else if (taxableAmt <= TAXABLE_LEVEL_2) {
        result = (taxableAmt - TAXABLE_LEVEL_1) * TAX_RATE_2 + TAX_AMT_1;
    }

    else if (taxableAmt <= TAXABLE_LEVEL_3) {
        result = (taxableAmt - TAXABLE_LEVEL_2) * TAX_RATE_3 + TAX_AMT_2;
    }

    else if (taxableAmt <= TAXABLE_LEVEL_4) {
        result = (taxableAmt - TAXABLE_LEVEL_3) * TAX_RATE_4 + TAX_AMT_3;
    }

    else if (taxableAmt <= TAXABLE_LEVEL_5) {
        result = (taxableAmt - TAXABLE_LEVEL_4) * TAX_RATE_5 + TAX_AMT_4;
    }

    else if (taxableAmt <= TAXABLE_LEVEL_6) {
        result = (taxableAmt - TAXABLE_LEVEL_5) * TAX_RATE_6 + TAX_AMT_5;
    }

    else {
        result = (taxableAmt - TAXABLE_LEVEL_6) * TAX_RATE_7 + TAX_AMT_6;
    }
    return result;
}

module.exports = {
  calculateSI, calculateMI, calculateUI, calculatePit
}
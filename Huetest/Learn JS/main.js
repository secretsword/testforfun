
const SOCIAL_INSURANCE_RATE = 0.08;
const HEALTH_INSURANCE_RATE = 0.015;
const UNEMPLOYMENT_INSURANCE_RATE = 0.01;
const BASE_SALARY = 1490000;
const MAX_SALARY = BASE_SALARY * 20;

const MIN_WAVE_1 = 4680000;
const MIN_WAVE_2 = 4160000;
const MIN_WAVE_3 = 3640000;
const MIN_WAVE_4 = 3250000;

const PERSONAL_DEDUCTION = 11000000;
const DEPENDANT_DEDUCTION = 4400000;

const TAX_RATE_1 = 0.05;
const TAX_RATE_2 = 0.1;
const TAX_RATE_3 = 0.15;
const TAX_RATE_4 = 0.2;
const TAX_RATE_5 = 0.25;
const TAX_RATE_6 = 0.3;
const TAX_RATE_7 = 0.35;

function calculateNetSalary() {
    let salary = document.getElementById('salary').value;
    let region = document.getElementById('region').value;
    let numberOfDependant = document.getElementById('numberOfDependant').value;
    
    let socialInsurance = calculateSI(salary);
    let healthInsurance = calculateHI(salary);
    let unemploymentInsurance = calculateUI(salary, region);
    let salaryBeforeTax = salary - socialInsurance - healthInsurance - unemploymentInsurance;
    let taxableSalary = salaryBeforeTax - PERSONAL_DEDUCTION - DEPENDANT_DEDUCTION * numberOfDependant;
    let personalIncomeTax = calculatePIT(taxableSalary);
    let netSalary = salaryBeforeTax - personalIncomeTax;
    return netSalary;
    
    console.log(socialInsurance, healthInsurance, unemploymentInsurance, salaryBeforeTax, taxableSalary);
}
// calculate social insurance 
function calculateSI(salary) {
    if (salary > MAX_SALARY) {
        salary = MAX_SALARY;
    }
    let result = salary * SOCIAL_INSURANCE_RATE;
    return result;
}

// calculate health insurance 
function calculateHI(salary) {
    if (salary > MAX_SALARY) {
        salary = MAX_SALARY;
    }
    let result = salary * HEALTH_INSURANCE_RATE;
    return result;
}


// calculate unemployment insurance 
function calculateUI(salary, region) {
    let maxSalary;
    if (region == 1) {
        maxSalary = MIN_WAVE_1 * 20;
    }
    if (region == 2) {
        maxSalary = MIN_WAVE_2 * 20;
    }
    if (region == 3) {
        maxSalary = MIN_WAVE_3 * 20;   
    }
    if (region == 4) {
        maxSalary = MIN_WAVE_4 * 20;
    }
    if (salary > maxSalary) {
        salary = maxSalary;
    }

    let result = salary * UNEMPLOYMENT_INSURANCE_RATE;
    return result;
}

// calculate total deduction
function calculatePIT(taxableSalary) {

}
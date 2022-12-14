
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

const MAX_INCOME_RANGE_1 = 5000000;
const MAX_INCOME_RANGE_2 = 10000000;
const MAX_INCOME_RANGE_3 = 18000000;
const MAX_INCOME_RANGE_4 = 32000000;
const MAX_INCOME_RANGE_5 = 52000000;
const MAX_INCOME_RANGE_6 = 80000000;

const MAX_TAX_RANGE_1 = MAX_INCOME_RANGE_1 * TAX_RATE_1;
const MAX_TAX_RANGE_2 = MAX_TAX_RANGE_1 + (MAX_INCOME_RANGE_2 - MAX_INCOME_RANGE_1) * TAX_RATE_2;
const MAX_TAX_RANGE_3 = MAX_TAX_RANGE_2 + (MAX_INCOME_RANGE_3 - MAX_INCOME_RANGE_2) * TAX_RATE_3;
const MAX_TAX_RANGE_4 = MAX_TAX_RANGE_3 + (MAX_INCOME_RANGE_4 - MAX_INCOME_RANGE_3) * TAX_RATE_4;
const MAX_TAX_RANGE_5 = MAX_TAX_RANGE_4 + (MAX_INCOME_RANGE_5 - MAX_INCOME_RANGE_4) * TAX_RATE_5;
const MAX_TAX_RANGE_6 = MAX_TAX_RANGE_5 + (MAX_INCOME_RANGE_6 - MAX_INCOME_RANGE_5) * TAX_RATE_6;

function calculateNetSalary() {
    let salary = document.getElementById('salary').value;
    let region = document.getElementById('region').value;
    let numberOfDependant = document.getElementById('numberOfDependant').value;

    let socialInsurance = calculateSI(salary);
    let healthInsurance = calculateHI(salary);
    let unemploymentInsurance = calculateUI(salary, region);

    let salaryBeforeTax = salary - socialInsurance - healthInsurance - unemploymentInsurance;
    let taxableSalary = calculateTS (salaryBeforeTax, numberOfDependant);
    
    let personalIncomeTax = calculatePIT(taxableSalary);

    let netSalary = salaryBeforeTax - personalIncomeTax;

    // Display net salary 
    let netSalaryUS = new Intl.NumberFormat().format(netSalary);
    document.getElementById('net-salary').innerHTML= 'Your Net Salary is: ' + netSalaryUS;
    let displayNetSalary = document.getElementById('net-salary');
    displayNetSalary.classList.remove('hide');

    // Display gross salary 
    let grossSalaryUS = 'GROSS SALARY: ' + new Intl.NumberFormat().format(salary);
    document.getElementById('gross-salary').innerHTML= grossSalaryUS;
    let displayGrossSalary = document.getElementById('gross-salary');
    displayGrossSalary.classList.remove('hide');

    // Display social insurance 
    let socialInsuranceUS = 'Social Insurance: ' + new Intl.NumberFormat().format(socialInsurance);
    document.getElementById('social-insurance').innerHTML= socialInsuranceUS;
    let displaySocialInsurance = document.getElementById('social-insurance');
    displaySocialInsurance.classList.remove('hide');

    // Display Health insurance 
    let healthInsuranceUS = 'Health Insurance: ' + new Intl.NumberFormat().format(healthInsurance);
    document.getElementById('health-insurance').innerHTML= healthInsuranceUS;
    let displayHealthInsurance = document.getElementById('health-insurance');
    displayHealthInsurance.classList.remove('hide');

    // Display Unemployment Insurance 
    let unemploymentInsuranceUS = 'Unemployment Insurance: ' + new Intl.NumberFormat().format(unemploymentInsurance);
    document.getElementById('unemployment-insurance').innerHTML= unemploymentInsuranceUS;
    let displayUnemploymentInsurance = document.getElementById('unemployment-insurance');
    displayUnemploymentInsurance.classList.remove('hide');

    // Display salary Before Tax 
    let salaryBeforeTaxUS = 'SALARY BEFORE TAX: ' + new Intl.NumberFormat().format(salaryBeforeTax);
    document.getElementById('salary-before-tax').innerHTML= salaryBeforeTaxUS;
    let displaySalaryBeforeTax = document.getElementById('salary-before-tax');
    displaySalaryBeforeTax.classList.remove('hide');

    // Display deduction 
    let personalDeductionUS = 'Personal deduction: ' + new Intl.NumberFormat().format(PERSONAL_DEDUCTION);
    document.getElementById('personal-deduction').innerHTML= personalDeductionUS;
    let displayPersonalDeduction = document.getElementById('personal-deduction');
    displayPersonalDeduction.classList.remove('hide');

    let dependantDeductionUS = 'Dependant deduction: ' + new Intl.NumberFormat().format(DEPENDANT_DEDUCTION * numberOfDependant);
    document.getElementById('dependant-deduction').innerHTML= dependantDeductionUS;
    let displayDependantDeduction = document.getElementById('dependant-deduction');
    displayDependantDeduction.classList.remove('hide');

    // Display taxable salary 
    let taxableSalaryUS = 'TAXABLE SALARY: ' + new Intl.NumberFormat().format(taxableSalary);
    document.getElementById('taxable-salary').innerHTML= taxableSalaryUS;
    let displayTaxableSalary = document.getElementById('taxable-salary');
    displayTaxableSalary.classList.remove('hide');

    // Display PIT 
    let personalIncomeTaxUS = 'Personal Income Tax: ' + new Intl.NumberFormat().format(personalIncomeTax);
    document.getElementById('pit').innerHTML= personalIncomeTaxUS;
    let displayPersonalIncomeTax = document.getElementById('pit');
    displayPersonalIncomeTax.classList.remove('hide');

    // Display Net Salary at bottom 
    document.getElementById('net-result').innerHTML= 'NET SALARY: ' + netSalaryUS;
    let displayNetResult = document.getElementById('net-result');
    displayNetResult.classList.remove('hide');



    console.log(socialInsurance, healthInsurance, unemploymentInsurance, salaryBeforeTax, taxableSalary, personalIncomeTax, netSalary);

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

// calculate taxable salary 
function calculateTS(salaryBeforeTax, numberOfDependant) { 
    let result = salaryBeforeTax - PERSONAL_DEDUCTION - DEPENDANT_DEDUCTION * numberOfDependant;
    if (result < 0) {
        result = 0;
    }
    return result;
}

// calculate personal income tax
function calculatePIT(taxableSalary) {
    let result;
    if (taxableSalary <= MAX_INCOME_RANGE_1) {
        result = taxableSalary * TAX_RATE_1;
    }
    else if (taxableSalary <= MAX_INCOME_RANGE_2) {
        result = (taxableSalary - MAX_INCOME_RANGE_1) * TAX_RATE_2 + MAX_TAX_RANGE_1;
    }

    else if (taxableSalary <= MAX_INCOME_RANGE_3) {
        result = (taxableSalary - MAX_INCOME_RANGE_2) * TAX_RATE_3 + MAX_TAX_RANGE_2;
    }

    else if (taxableSalary <= MAX_INCOME_RANGE_4) {
        result = (taxableSalary - MAX_INCOME_RANGE_3) * TAX_RATE_4 + MAX_TAX_RANGE_3;
    }

    else if (taxableSalary <= MAX_INCOME_RANGE_5) {
        result = (taxableSalary - MAX_INCOME_RANGE_4) * TAX_RATE_5 + MAX_TAX_RANGE_4;
    }

    else if (taxableSalary <= MAX_INCOME_RANGE_6) {
        result = (taxableSalary - MAX_INCOME_RANGE_5) * TAX_RATE_6 + MAX_TAX_RANGE_5;
    }

    else {
        result = (taxableSalary - MAX_INCOME_RANGE_6) * TAX_RATE_7 + MAX_TAX_RANGE_6;
    }
    return result;
}

// Display net salary
// function removeClass() {
//     let element = document.getElementById('net-salary');
//     element.classList.remove('hide');
// }


module.exports = { calculateSI, calculateHI, calculateUI, calculateTS, calculatePIT, calculateNetSalary
}
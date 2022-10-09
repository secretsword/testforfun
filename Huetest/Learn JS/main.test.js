const mainFile = require("./main");

describe('test function calculate social insurance', () => {
    it('should calculate correctly if salary < max salary', () => {
        expect(mainFile.calculateSI(20000000)).toBe(20000000*0.08)
    })

    it('should calculate correctly if salary = max salary', () => {
        expect(mainFile.calculateSI(29800000)).toBe(29800000*0.08)            
    })

    it('should should calculate correctly if salary > max salary', () => {
        expect(mainFile.calculateSI(40000000)).toBe(29800000*0.08)
    })
})

describe('test function calculate health insurance', () => {
    it('should calculate correctly if salary < max salary', () => {
        expect(mainFile.calculateHI(20000000)).toBe(20000000*0.015)
    })

    it('should calculate correctly if salary = max salary', () => {
        expect(mainFile.calculateHI(29800000)).toBe(29800000*0.015)            
    })

    it('should should calculate correctly if salary > max salary', () => {
        expect(mainFile.calculateHI(40000000)).toBe(29800000*0.015)
    })
})

describe('test function calculate unemployment insurance', () => {
    // region 1 
    it('should calculate correctly if salary < max salary in region 1', () => {
        expect(mainFile.calculateUI(90000000, 1)).toBe(90000000*0.01)
    })

    it('should calculate correctly if salary = max salary in region 1', () => {
        expect(mainFile.calculateUI(93600000, 1)).toBe(93600000*0.01)
    })

    it('should calculate correctly if salary > max salary in region 1', () => {
        expect(mainFile.calculateUI(100000000, 1)).toBe(93600000*0.01)
    })

    // region 2
    it('should calculate correctly if salary < max salary in region 2', () => {
        expect(mainFile.calculateUI(82000000, 2)).toBe(82000000*0.01)
    })

    it('should calculate correctly if salary = max salary in region 2', () => {
        expect(mainFile.calculateUI(83200000, 2)).toBe(83200000*0.01)
    })

    it('should calculate correctly if salary > max salary in region 2', () => {
        expect(mainFile.calculateUI(120300000, 2)).toBe(83200000*0.01)
    })

    // region 3

    it('should calculate correctly if salary < max salary in region 3', () => {
        expect(mainFile.calculateUI(72000000, 3)).toBe(72000000*0.01)
    })

    it('should calculate correctly if salary = max salary in region 3', () => {
        expect(mainFile.calculateUI(72800000, 3)).toBe(72800000*0.01)
    })

    it('should calculate correctly if salary > max salary in region 3', () => {
        expect(mainFile.calculateUI(72900000, 3)).toBe(72800000*0.01)
    })

    // region 4

    it('should calculate correctly if salary < max salary in region 4', () => {
        expect(mainFile.calculateUI(20000000, 4)).toBe(20000000*0.01)
    })

    it('should calculate correctly if salary = max salary in region 4', () => {
        expect(mainFile.calculateUI(65000000, 4)).toBe(65000000*0.01)
    })

    it('should calculate correctly if salary > max salary in region 4', () => {
        expect(mainFile.calculateUI(66000000, 4)).toBe(65000000*0.01)
    })
})

describe('test function calculate taxable salary', () => {

    // taxable salary = 0 
    it('should calculate correctly if salaryBeforeTax < total deduction with 0 dependant', () => {
        expect(mainFile.calculateTS(10000000, 0)).toBe(0)
    })

    it('should calculate correctly if salaryBeforeTax < total deduction with 1 dependant', () => {
        expect(mainFile.calculateTS(15000000, 1)).toBe(0)
    })

    it('should calculate correctly if salaryBeforeTax < total deduction with 2 dependants', () => {
        expect(mainFile.calculateTS(19000000, 2)).toBe(0)
    })

    // taxable salary > 0 
    it('should calculate correctly if salaryBeforeTax > total deduction with 0 dependant', () => {
        expect(mainFile.calculateTS(12000000, 0)).toBe(1000000)
    })

    it('should calculate correctly if salaryBeforeTax > total deduction with 1 dependant', () => {
        expect(mainFile.calculateTS(16000000, 1)).toBe(600000)
    })

    it('should calculate correctly if salaryBeforeTax > total deduction with 2 dependants', () => {
        expect(mainFile.calculateTS(20000000, 2)).toBe(200000)
    })
})

describe('test function calculate personal income tax', () => {
    it('should calculate with tax rate 1 if taxable salary < 5000000', () => {
        expect(mainFile.calculatePIT(4000000)).toBe(4000000 * 0.05)
    })

    it('should calculate with tax rate 1 if taxable salary = 5000000', () => {
        expect(mainFile.calculatePIT(5000000)).toBe(5000000 * 0.05)
    })

    it('should calculate correctly if taxable salary is between range of 5000000 and 10000000', () => {
        expect(mainFile.calculatePIT(6000000)).toBe(5000000 * 0.05 + 1000000 * 0.1)
    })

    it('should calculate correctly if taxable salary = 10000000', () => {
        expect(mainFile.calculatePIT(10000000)).toBe(5000000 * 0.05 + 5000000 * 0.1)
    })

    it('should calculate correctly if taxable salary is between range of 10000000 and 18000000', () => {
        expect(mainFile.calculatePIT(12500000)).toBe(5000000 * 0.05 + 5000000 * 0.1 + 2500000 * 0.15)
    })

    it('should calculate correctly if taxable salary = 18000000', () => {
        expect(mainFile.calculatePIT(18000000)).toBe(5000000 * 0.05 + 5000000 * 0.1 + 8000000 * 0.15)
    })

    it('should calculate correctly if taxable salary is between range of 18000000 and 32000000', () => {
        expect(mainFile.calculatePIT(28567000)).toBe(5000000 * 0.05 + 5000000 * 0.1 + 8000000 * 0.15 + 10567000 *0.2)
    })

    it('should calculate correctly if taxable salary = 32000000', () => {
        expect(mainFile.calculatePIT(32000000)).toBe(5000000 * 0.05 + 5000000 * 0.1 + 8000000 * 0.15 + 14000000 * 0.2)
    })

    it('should calculate correctly if taxable salary is between range of 32000000 and 52000000', () => {
        expect(mainFile.calculatePIT(48285000)).toBe(5000000 * 0.05 + 5000000 * 0.1 + 8000000 * 0.15 + 14000000 *0.2 + 16285000 * 0.25)
    })

    it('should calculate correctly if taxable salary = 52000000', () => {
        expect(mainFile.calculatePIT(52000000)).toBe(5000000 * 0.05 + 5000000 * 0.1 + 8000000 * 0.15 + 14000000 * 0.2 + 20000000 *0.25)
    })

    it('should calculate correctly if taxable salary is between range of 52000000 and 80000000', () => {
        expect(mainFile.calculatePIT(58285000)).toBe(5000000 * 0.05 + 5000000 * 0.1 + 8000000 * 0.15 + 14000000 *0.2 + 20000000 *0.25 + 6285000 * 0.3)
    })

    it('should calculate correctly if taxable salary = 80000000', () => {
        expect(mainFile.calculatePIT(80000000)).toBe(5000000 * 0.05 + 5000000 * 0.1 + 8000000 * 0.15 + 14000000 * 0.2 + 20000000 *0.25 + 28000000 * 0.3)
    })
    
    it('should calculate correctly if taxable salary > 80000000', () => {
        expect(mainFile.calculatePIT(82500000)).toBe(5000000 * 0.05 + 5000000 * 0.1 + 8000000 * 0.15 + 14000000 * 0.2 + 20000000 *0.25 + 28000000 * 0.3 + 2500000 * 0.35)
    })

})
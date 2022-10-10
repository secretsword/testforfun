const mainFile = require("./main");

describe('TEST FUNCTION CALCULATE SI', () => {
  it('should calculate correct if salary < max salary', function () {
    expect(mainFile.calculateSI(10000000)).toBe(10000000 * 0.08)
  })

  it('should calculate correct if salary > max salary', function () {
    expect(mainFile.calculateSI(100000000)).toBe(1490000 * 20 * 0.08)
  })
})

// unit test for medical insurance
describe('TEST FUNCTION CALCULATE MI',() => {
    it('if salary > max salary', function (){
        expect(mainFile.calculateMI(30000000)).toBe(1490000 * 20 * 0.015)
    })

    it('if salary = max salary', function(){
        expect(mainFile.calculateMI(29800000)).toBe(1490000 * 20 * 0.015)
    })

    it('if salary < max salary',function(){
        expect(mainFile.calculateMI(20000000)).toBe(20000000 * 0.015)
    })
})

// unit test for unemployment insurance
describe('TEST FUNCTION CALCULATE UI',() => {
    // region = 1
    it('if region = 1 and salary > max salary',function(){
        expect(mainFile.calculateUI(90000000, 1)).toBe(4420000 * 20 * 0.01)
    })

    it('if region = 1 and salary = max salary',function(){
        expect(mainFile.calculateUI(88400000, 1)).toBe(4420000 * 20 * 0.01)
    })

    it('if region = 1 and salary < max salary',function(){
        expect(mainFile.calculateUI(80000000, 1)).toBe(80000000 * 0.01)
    })

    // region = 2
    it('if region = 2 and salary > max salary',function(){
        expect(mainFile.calculateUI(80000000, 2)).toBe(3920000 * 20 * 0.01)
    })

    it('if region = 2 and salary = max salary',function(){
        expect(mainFile.calculateUI(78400000, 2)).toBe(3920000 * 20 * 0.01)
    })

    it('if region = 2 and salary < max salary',function(){
        expect(mainFile.calculateUI(70000000, 2)).toBe(70000000 * 0.01)
    })

    // region = 3
    it('if region = 3 and salary > max salary',function(){
        expect(mainFile.calculateUI(70000000, 3)).toBe(3430000 * 20 * 0.01)
    })

    it('if region = 3 and salary = max salary',function(){
        expect(mainFile.calculateUI(68600000, 3)).toBe(3430000 * 20 * 0.01)
    })

    it('if region = 3 and salary < max salary',function(){
        expect(mainFile.calculateUI(60000000, 3)).toBe(60000000 * 0.01)
    })

    // region = 4
    it('if region = 4 and salary > max salary',function(){
        expect(mainFile.calculateUI(62000000, 4)).toBe(3070000 * 20 * 0.01)
    })

    it('if region = 4 and salary = max salary',function(){
        expect(mainFile.calculateUI(61400000, 4)).toBe(3070000 * 20 * 0.01)
    })

    it('if region = 4 and salary = max salary',function(){
        expect(mainFile.calculateUI(60000000, 4)).toBe(60000000 * 0.01)
    })
})

// unit test for income before tax
describe('TEST FUNCTION CALCULATE INCOME BEFORE TAX',() =>{
    it('test income before tax value',function(){
        expect(mainFile.calculateIBT(30000000,500000, 500000, 30000)).toBe(30000000 - 500000 - 500000 - 30000)
    })
})


// unit test for tax income
describe('TEST FUNCTION CALCULATE TAX INCOME',() =>{
    it('test tax income > 0',function(){
        expect(mainFile.calculateTI(30000000, 4400000)).toBe(30000000 - 11000000 - 4400000)
    })

    it('test tax income < 0',function(){
        expect(mainFile.calculateTI(8000000, 0)).toBe(0)
    })

    it('test tax income = 0',function(){
        expect(mainFile.calculateTI(11000000, 0)).toBe(0)
    })

    it('test tax income > 0 and dependency = 0',function(){
        expect(mainFile.calculateTI(80000000, 0)).toBe(80000000 - 11000000 - 0)
    })

    it('test tax income > 0 and dependency = 1',function(){
        expect(mainFile.calculateTI(80000000, 4400000)).toBe(80000000 - 11000000 - 4400000)
    })

    it('test tax income > 0 and dependency = 2',function(){
        expect(mainFile.calculateTI(80000000, 8800000)).toBe(80000000 - 11000000 - 8800000)
    })
})


//unit test for calculate PIT1
describe('TEST FUNCTION CALCULATE PIT 1',() =>{
    it('test PIT 1 = 0', function(){
        expect(mainFile.calculatePIT1(0)).toBe(0)
    })

    it('test PIT 1 > 0 and < max pit range 1', function(){
        expect(mainFile.calculatePIT1(4900000)).toBe(4900000 * 0.05)
    })

    it('test PIT 1 > max pit range 1', function(){
        expect(mainFile.calculatePIT1(6000000)).toBe(5000000 * 0.05)
    })
})

//unit test for calculate PIT2
describe('TEST FUNCTION CALCULATE PIT 2',() =>{
    it('test PIT 2 <= PIT 1', function(){
        expect(mainFile.calculatePIT2(5000000)).toBe(0)
    })

    it('test PIT 2 > PIT 1 and < max pit range 2', function(){
        expect(mainFile.calculatePIT2(9000000)).toBe((9000000 - 5000000) * 0.1)
    })

    it('test PIT 2 >= max pit range 2', function(){
        expect(mainFile.calculatePIT2(15000000)).toBe(5000000 * 0.1)
    })
})


//unit test for calculate PIT3
describe('TEST FUNCTION CALCULATE PIT 3',() =>{
    it('test PIT 3 <= PIT 2', function(){
        expect(mainFile.calculatePIT3(10000000)).toBe(0)
    })

    it('test PIT 3 > PIT 2 and < max pit range 3', function(){
        expect(mainFile.calculatePIT3(15000000)).toBe(5000000* 0.15)
    })

    it('test PIT 3 >= max pit range 3', function(){
        expect(mainFile.calculatePIT3(25000000)).toBe(8000000 * 0.15)
    })
})

//unit test for calculate PIT4
describe('TEST FUNCTION CALCULATE PIT 4',() =>{
    it('test PIT 4 <= PIT 3', function(){
        expect(mainFile.calculatePIT4(18000000)).toBe(0)
    })

    it('test PIT 4 > PIT 3 and < max pit range 4', function(){
        expect(mainFile.calculatePIT4(25000000)).toBe(7000000* 0.2)
    })

    it('test PIT 4 >= max pit range 4', function(){
        expect(mainFile.calculatePIT4(50000000)).toBe(14000000 * 0.2)
    })
})

//unit test for calculate PIT5
describe('TEST FUNCTION CALCULATE PIT 5',() =>{
    it('test PIT 5 <= PIT 4', function(){
        expect(mainFile.calculatePIT5(32000000)).toBe(0)
    })

    it('test PIT 5 > PIT 4 and < max pit range 4', function(){
        expect(mainFile.calculatePIT5(40000000)).toBe(8000000* 0.25)
    })

    it('test PIT 5 >= max pit range 5', function(){
        expect(mainFile.calculatePIT5(60000000)).toBe(20000000 * 0.25)
    })
})


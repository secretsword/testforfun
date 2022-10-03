const mainFile = require("./main");

describe('TEST FUNCTION CALCULATE SI', () => {
  it('should calculate correct if salary < max salary', function () {
    expect(mainFile.calculateSI(10000000)).toBe(10000000 * 0.08)
  })

  it('should calculate correct if salary > max salary', function () {
    expect(mainFile.calculateSI(100000000)).toBe(1490000 * 20 * 0.08)
  })


})

const assert = require('assert')
const balance = require('../lib/balance_equation')

describe('balance_equation', function() {

  const [left1, right1] = ['NaBr + Cl2', 'NaCl + Br2']
  it(`should balance the equation ${left1} -> ${right1}`, function() {
    assert.equal(balance(left1, right1), '2NaBr + 1Cl2 -> 2NaCl + 1Br2')
  })

  const [left2, right2] = ['Cr2O3 + Mg', 'Cr + MgO']
  it(`should balance the equation ${left2} -> ${right2}`, function() {
    assert.equal(balance(left2, right2), '1Cr2O3 + 3Mg -> 2Cr + 3MgO')
  })

  const [left3, right3] = ['H2 + O2', 'H2O']
  it(`should balance the equation ${left3} -> ${right3}`, function() {
    assert.equal(balance(left3, right3), '2H2 + 1O2 -> 2H2O')
  })

  const [left4, right4] = ['C2H6 + O2', 'CO2 + H2O']
  it(`should balance the equation ${left4} -> ${right4}`, function() {
    assert.equal(balance(left4, right4), '2C2H6 + 7O2 -> 4CO2 + 6H2O')
  })

  const [left5, right5] = ['Al2(SO4)3 + Ca(OH)2', 'Al(OH)3 + CaSO4']
  it(`should balance the equation ${left5} -> ${right5}`, function() {
    assert.equal(balance(left5, right5), '1Al2(SO4)3 + 3Ca(OH)2 -> 2Al(OH)3 + 3CaSO4')
  })
})

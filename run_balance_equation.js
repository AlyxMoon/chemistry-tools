const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
const balance = require('./lib/balance_equation')

console.log('This is a chemistry equation balancing tool.')
console.log('To use this tool, you will be asked to input both sides of a chemistry equation, without coefficients.')
console.log('After you have input both sides, you will be given the full equation with coefficients on both sides, if the equation can be balanced.')
console.log('This tool will compute equations only containing atoms and molecules, please do not input anything else (such as electron charge or compound states).')
console.log('=====')

let left = '';
let right = '';

Promise.resolve()
  .then(() => new Promise(resolve => {
    readline.question('Please enter the left side of the equation: ', response => resolve(left = response))
  }))
  .then(() => new Promise(resolve => {
    readline.question('Please enter the right side of the equation: ', response => resolve(right = response))
  }))
  .then(() => {
    readline.close()
    console.log(balance(left, right))
  })

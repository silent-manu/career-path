const calc = require('./calc.js');

const a = 4;
const b = 5;

const result = calc.add(a, b);
const result2 = calc.sub(a, b);

console.log("The output 1 is: " + result);
console.log("The output 2 is: " + result2);
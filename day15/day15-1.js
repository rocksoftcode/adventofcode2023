const steps = require('node:fs').readFileSync('./day15.txt', 'utf-8').split(',');
let total = 0;
steps.forEach(s => {
  let current = 0;
  s.split('').forEach(c => {
    current += c.charCodeAt(0);
    current *= 17;
    current %= 256;
  })
  total += current;
})
console.log(total);
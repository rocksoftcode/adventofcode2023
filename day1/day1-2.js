const numbers = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9'
};
const fs = require('node:fs');
const lines = fs.readFileSync('./day1.txt', 'utf-8').split('\n');
const rex = /(?=(one|two|three|four|five|six|seven|eight|nine|[0-9]))/g;
const asNumber = n => isNaN(n) ? numbers[n] : Number(n);
console.log(lines.map(l => {
      const numbers = [...l.matchAll(rex)].map(match => match[1]);
      return Number(`${asNumber(numbers[0])}${asNumber(numbers.pop())}`);
    }).reduce((acc, v) => acc + v, 0));
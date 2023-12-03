const fs = require('node:fs');
const symbols = [];
const numbers = [];
const grid = fs.readFileSync('./day3.txt', 'utf-8').split('\n');
const range = (l, s) => [...Array(l).keys()].map(i => i + s);
const n = (y, x) => y > 0 && symbols.find(s => s === `${+y-1}:${x}`);
const ne = (y, x) => y > 0 && x < grid[0].length-2 && symbols.find(s => s === `${+y-1}:${+x+1}`);
const e = (y, x) => x < grid[0].length-2 && symbols.find(s => s === `${y}:${+x+1}`);
const se = (y, x) => y < grid.length-2 && x < grid[0].length-2 && symbols.find(s => s === `${+y+1}:${+x+1}`);
const s = (y, x) => y < grid.length-2 && symbols.find(s => s === `${+y+1}:${x}`);
const sw = (y, x) => y < grid.length-2 && x > 0 && symbols.find(s => s === `${+y+1}:${+x-1}`);
const w = (y, x) => x > 0 && symbols.find(s => s === `${y}:${+x-1}`);
const nw = (y, x) => y > 0 && x > 0 && symbols.find(s => s === `${+y-1}:${+x-1}`);
grid.forEach((l, y) => {
  [...l.matchAll(/\d+/g)].forEach(n => numbers.push({[n[0]]: range(n[0].length, n.index).map(x => `${y}:${x}`) }));
  Array.from(l).forEach((c, x) => {
    if (!/[\d.]/.test(l[x])) {
      symbols.push(`${y}:${x}`);
    }
  });
});

const sum = numbers.reduce((acc, v) => {
  const num = Object.keys(v)[0];
  const coords = v[num];
  if (coords.some(c => n(...c.split(':')) ||
      ne(...c.split(':')) ||
      e(...c.split(':')) ||
      se(...c.split(':')) ||
      s(...c.split(':')) ||
      sw(...c.split(':')) ||
      w(...c.split(':')) ||
      nw(...c.split(':'))
  )) {
    acc += +num;
  }
  return acc;
}, 0);
console.log(sum);

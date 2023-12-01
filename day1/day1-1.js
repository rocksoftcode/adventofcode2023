const fs = require('node:fs');
const lines = fs.readFileSync('./day1.txt', 'utf-8').split('\n');
const sums = lines.map(l => l.replaceAll(/[a-z]/g, ''))
    .map(n => n.length > 2 ? `${n[0]}${n.slice(-1)}` : n)
    .map(n => n.length === 1 ? `${n}${n}` : n)
    .map(n => Number(n))
    .reduce((acc, v) => acc + v, 0);
console.log(sums);
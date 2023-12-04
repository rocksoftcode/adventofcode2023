const fs = require('node:fs');
const cards = fs.readFileSync('./day4.txt', 'utf-8').split('\n')
    .map(l => l.split(/Card .*: /)).map(c => c[1]);
const winners = cards.map(c => c.split(' | ')).map(c => c[0]).map(c => c.trimStart().split(/\s+/));
const numbers = cards.map(c => c.split(' | ')).map(c => c[1]).map(c => c.trimStart().split(/\s+/));
let total = 0;
winners.forEach((w, i) => {
  let cardTotal = 0;
  w.forEach(n => {
    if (numbers[i].find(nn => nn === n)) cardTotal = cardTotal === 0 ? 1 : cardTotal * 2;
  })
  total += cardTotal;
})
console.log(total);
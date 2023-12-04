const fs = require('node:fs');
const cards = fs.readFileSync('./day4.txt', 'utf-8').split('\n')
    .map(l => l.split(/Card .*: /)).map(c => c[1]);
const winners = cards.map(c => c.split(' | ')).map(c => c[0]).map(c => c.trimStart().split(/\s+/));
const numbers = cards.map(c => c.split(' | ')).map(c => c[1]).map(c => c.trimStart().split(/\s+/));
const pile = numbers.map(() => 1);
winners.forEach((w, i) => {
  const matches = numbers[i].filter(n => w.find(wn => wn === n)).length;
  for (let j = i + 1; j <= i + matches; j++) {
    pile[j] += pile[i];
  }
});
console.log(pile.reduce((acc, v) => acc + v, 0));
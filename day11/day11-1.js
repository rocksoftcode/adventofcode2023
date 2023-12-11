const lines = require('node:fs').readFileSync('./day11.txt', 'utf-8').trim().split('\n');
const rows = {};
const exp = {};
const galaxies = [];
lines.forEach((line, i) => {
  const matches = [...line.matchAll(/#/g)];
  if (matches.length === 0) {
    rows[i] = true;
  } else {
    matches.forEach(match => {
      exp[match.index] = 0;
      galaxies.push({
        row: i + Object.keys(rows).length * 999999,
        col: match.index,
      });
    });
  }
});

let count = 0;
const cols = lines[0].length;
for (let i = 0; i < cols; i++) {
  if (exp[i] === undefined) {
    count += 999999;
  } else {
    exp[i] = count;
  }
}

galaxies.forEach(g => {
  g.col += exp[g.col];
});

let sum = 0;
for (let i = 0; i < galaxies.length - 1; i++) {
  for (let j = i; j < galaxies.length; j++) {
    sum += Math.abs(galaxies[i].row - galaxies[j].row) + Math.abs(galaxies[i].col - galaxies[j].col);
  }
}

console.log(sum);
const grid = require('node:fs').readFileSync('./day14.txt', 'utf-8').split('\n').map(l => l.split(''));

const tumbleN = () => {
  for (let i = 0; i < grid[0].length; i++) {
    let edge = 0;
    for (let j = 0; j < grid.length; j++) {
      if (grid[j][i] === '#') edge = j + 1;
      if (grid[j][i] === 'O') {
        grid[j][i] = '.';
        grid[edge][i] = 'O';
        edge++;
      }
    }
  }
}

const tumbleE = () => {
  for (let i = 0; i < grid.length; i++) {
    let edge = grid[i].length - 1;
    for (let j = grid[i].length - 1; j >= 0; j--) {
      if (grid[i][j] === '#') edge = j - 1;
      if (grid[i][j] === 'O') {
        grid[i][j] = '.';
        grid[i][edge] = 'O';
        edge--;
      }
    }
  }
}

const tumbleS = () => {
  for (let i = 0; i < grid[0].length; i++) {
    let edge = grid.length - 1;
    for (let j = grid.length - 1; j >= 0; j--) {
      if (grid[j][i] === '#') edge = j - 1;
      if (grid[j][i] === 'O') {
        grid[j][i] = '.';
        grid[edge][i] = 'O';
        edge--;
      }
    }
  }
}

const tumbleW = () => {
  for (let i = 0; i < grid.length; i++) {
    let edge = 0;
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '#') edge = j + 1;
      if (grid[i][j] === 'O') {
        grid[i][j] = '.';
        grid[i][edge] = 'O';
        edge++;
      }
    }
  }
}

const cache = {};
let i = 0;
let prev = 0;
let top = 1;
while (true) {
  const r = grid.map(l => l.join('')).join('\n');
  if (cache[r] === top) {
    if (top > 1) break;
    prev = i;
    top++;
  }
  tumbleN();
  tumbleW();
  tumbleS();
  tumbleE();
  cache[r] = (cache[r] ?? 0) + 1;
  i++;
}

const rem = (1_000_000_000 - prev) % (i - prev);
for (i = 0; i < rem; i++) {
  tumbleN();
  tumbleW();
  tumbleS();
  tumbleE();
}

console.log(grid.reduce((acc, v, i) => {
  return acc + (v.filter(c => c === 'O').length * (grid.length - i));
}, 0));

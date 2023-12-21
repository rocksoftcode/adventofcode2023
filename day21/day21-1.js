const grid = require('node:fs').readFileSync('./day21.txt', 'utf-8').split('\n').map(l => l.split(''));
const rowS = grid.findIndex(l => l.includes('S'));
const colS = grid[rowS].findIndex(c => c === 'S');
grid[rowS][colS] = '.';

const coord = (y, x) => y + ',' + x;
const adj = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

let coords = new Set();
coords.add(coord(rowS, colS));
for (let i = 0; i < 64; i++) {
  const gardens = new Set();
  for (const p of coords.values()) {
    const [y, x] = p.split(',').map(n => +n);
    for (const [dY, dX] of adj) {
      const adjY = y + dY;
      const adjX = x + dX;
      if (adjY < 0 || adjY >= grid.length || adjX < 0 || adjX >= grid.length) continue;
      if (grid[adjY][adjX] === '.') gardens.add(coord(adjY, adjX));
    }
  }
  coords = gardens;
}

console.log(coords.size);
const grid = require('node:fs').readFileSync('./day21.txt', 'utf-8').split('\n').map(l => l.split(''));
const rowS = grid.findIndex(l => l.includes('S'));
const colS = grid[rowS].findIndex(c => c === 'S');
grid[rowS][colS] = '.';

const coord = (y, x) => y + ',' + x;

const rows = grid.length;
const adj = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function run(rowS, colS, l) {
  let coords = new Set();
  coords.add(coord(rowS, colS));
  for (let i = 0; i < l - 1; i++) {
    const gardens = new Set();
    for (const p of coords.values()) {
      const [y, x] = p.split(',').map(n => +n);
      for (const [dY, dX] of adj) {
        const adjY = y + dY;
        const adjX = x + dX;
        if (adjY < 0 || adjY >= rows || adjX < 0 || adjX >= rows) continue;
        if (grid[adjY][adjX] === '.') gardens.add(coord(adjY, adjX));
      }
    }
    coords = gardens;
  }
  return coords.size;
}

const times = 26501365;
const t = times % rows;

const small = [
  [rows - 1, rows - 1, t],
  [rows - 1, 0, t],
  [0, rows - 1, t],
  [0, 0, t],
].map(([r, c, n]) => run(r, c, n));

const large = [
  [rows - 1, rows - 1, t + rows],
  [rows - 1, 0, t + rows],
  [0, rows - 1, t + rows],
  [0, 0, t + rows],
].map(([r, c, n]) => run(r, c, n));

const p = [
  [0, colS, rows],
  [rows - 1, colS, rows],
  [rowS, 0, rows],
  [rowS, rows - 1, rows],
].map(([r, c, n]) => run(r, c, n));

const r = [run(rowS, colS, rows - 1), run(rowS, colS, rows)];
const m = (times - t) / rows;
Array.prototype.sum = function() { return this.reduce((acc, v) => acc + v, 0); };
let plots = 0;
plots += small.sum() * m;
plots += large.sum() * (m - 1);
plots += p.sum();
plots += r[0] * (m - 1) ** 2;
plots += r[1] * m ** 2;

console.log(plots);
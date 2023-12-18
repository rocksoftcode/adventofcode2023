const grid = require('node:fs').readFileSync('./day17.txt', 'utf-8').split('\n').map(line => line.split('').map(n => +n));
const mem = new Set();
const q = [[0, 0, 0, 0, 0, 0]];

console.log("Take a stroll or do some chores.");
while (q.length > 0) {
  const [loss, rt, cf, drl, dcx, n] = q.shift();

  if (rt === grid.length - 1 && cf === grid[0].length - 1 && n >= 4) {
    console.log(loss);
    break;
  }

  if (mem.has(`${rt}-${cf}-${drl}-${dcx}-${n}`)) continue;
  mem.add(`${rt}-${cf}-${drl}-${dcx}-${n}`);

  if (n < 10 && (drl !== 0 || dcx !== 0)) {
    const nr = rt + drl;
    const nc = cf + dcx;
    if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length) {
      q.push([loss + grid[nr][nc], nr, nc, drl, dcx, n + 1]);
      q.sort((a, b) => a[0] - b[0]);
    }
  }

  if (n >= 4 || (drl === 0 && dcx === 0)) {
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    for (const [ndr, ndc] of directions) {
      if ((ndr !== drl || ndc !== dcx) && (ndr !== -drl || ndc !== -dcx)) {
        const nr = rt + ndr;
        const nc = cf + ndc;
        if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length) {
          q.push([loss + grid[nr][nc], nr, nc, ndr, ndc, 1]);
          q.sort((a, b) => a[0] - b[0]);
        }
      }
    }
  }
}
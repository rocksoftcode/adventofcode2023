const grid = require('node:fs').readFileSync('./day14.txt', 'utf-8').split('\n').map(l => l.split(''));
const tumble = s => {
  for (let y = s; y > 0 && y < grid.length; y--) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 'O' && grid[y-1][x] === '.') {
        grid[y-1][x] = 'O';
        grid[y][x] = '.';
        tumble(y+1);
      }
    }
  }
}
tumble(grid.length - 1);

console.log(grid.reduce((acc, v, i) => {
  return acc + (v.filter(c => c === 'O').length * (grid.length - i))
}, 0));
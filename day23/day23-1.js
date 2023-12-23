const grid = require('node:fs').readFileSync('./day23.txt', 'utf-8').split('\n').map(l => l.split('').map(c => c));

const coord = p => p[0] + ':' + p[1];
const sect = (a, b) => [a[0] + b[0], a[1] + b[1]];
const slope = {'>': 0, 'v': 1, '<': 2, '^': 3};
const move = [[1, 0], [0, 1], [-1, 0], [0, -1]];

const options = cur => {
  const opt = [];
  const v = grid[cur.p[1]][cur.p[0]];
  if (slope[v] !== undefined) opt.push(sect(cur.p, move[slope[v]]));
  else move.forEach(d => opt.push(sect(cur.p, d)));
  return opt.filter(o => {
    if (!grid[o[1]] || !grid[o[1]][o[0]] || grid[o[1]][o[0]] === '#') return false;
    return !cur.visited[coord(o)];
  });
};

const stack = [{p: [1, 0], steps: 0, visited: {}}];
const end = [grid[0].length - 2, grid.length - 1];
let max = 0;

while (stack.length) {
  let curr = stack.pop();
  let k = coord(curr.p);
  curr.visited[k] = 1;
  let moves = options(curr);
  while (moves.length === 1) {
    curr.visited[coord(moves[0])] = 1;
    curr.steps++;
    curr.p = moves[0];
    moves = options(curr);
  }

  if (curr.p[0] === end[0] && curr.p[1] === end[1]) {
    max = Math.max(max, curr.steps);
    continue;
  }

  moves.forEach(o => stack.push({
    p: o,
    steps: curr.steps + 1,
    visited: {...curr.visited}
  }));
}

console.log(max);

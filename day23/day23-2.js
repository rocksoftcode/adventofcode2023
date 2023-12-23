const grid = require('node:fs').readFileSync('./day23.txt', 'utf-8').split('\n').map(l => l.split('').map(c => c));

const coord = p => p[0] + ':' + p[1];
const sect = (a, b) => [a[0] + b[0], a[1] + b[1]];
const move = [[1, 0], [0, 1], [-1, 0], [0, -1]];

const options = cur => move.map(d => sect(cur.p, d)).filter(np => !(!grid[np[1]] || !grid[np[1]][np[0]] || grid[np[1]][np[0]] === '#'));

const connect = curr => {
  let junc = nodes.findIndex(n => n.p[0] === curr.p[0] && n.p[1] === curr.p[1]);
  if (junc === -1) {
    junc = nodes.length;
    nodes.push({p: curr.p.slice(), conn: []});
  }

  if (junc === curr.idLast) return junc;

  if (nodes[curr.idLast].conn.findIndex(conn => conn.id === junc) === -1) nodes[curr.idLast].conn.push({
    id: junc,
    distance: curr.steps - curr.toLast
  });

  if (nodes[junc].conn.findIndex(conn => conn.id === curr.idLast) === -1) nodes[junc].conn.push({
    id: curr.idLast,
    distance: curr.steps - curr.toLast
  });

  return junc;
};

let stack = [{p: [1, 0], steps: 0, idLast: 0, toLast: 0}];
let seen = {};
let endPos = [grid[0].length - 2, grid.length - 1];
let max;
const nodes = [{p: [1, 0], conn: []}];

while (stack.length) {
  const curr = stack.pop();
  const k = coord(curr.p);
  const moves = options(curr);

  if (moves.length > 2) {
    curr.idLast = connect(curr);
    curr.toLast = curr.steps;
  }

  if (seen[k]) continue;
  seen[k] = 1;

  if (curr.p[0] === endPos[0] && curr.p[1] === endPos[1]) {
    connect(curr);
    continue;
  }

  moves.forEach(np => stack.push({
    p: np,
    steps: curr.steps + 1,
    idLast: curr.idLast,
    toLast: curr.toLast,
  }));
}

stack = [{p: 0, steps: 0, seen: {}}];
endPos = nodes.length - 1;
max = 0;
while (stack.length) {
  let cur = stack.pop();
  let k = cur.p;
  cur.seen[k] = 1;
  if (cur.p === endPos) {
    max = Math.max(cur.steps, max);
    continue;
  }

  nodes[k].conn.filter(n => cur.seen[n.id] === undefined).forEach(n => stack.push({
    p: n.id,
    steps: cur.steps + n.distance,
    seen: {...cur.seen}
  }));
}

console.log(max);
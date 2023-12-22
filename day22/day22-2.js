const data = require('node:fs').readFileSync('./day22.txt', 'utf-8')
  .split('\n')
  .map(l => l.split('~').map(m => m.split(',').map(n => +n)))
  .map(([a, b]) => {
    let diff = 0;
    let axis;
    for (let i = 0; i < 3; i++) {
      const d = b[i] - a[i];
      if (d > diff) {
        diff = d;
        axis = i;
      }
    }
    const res = [[a[2], a[0], a[1]]];
    for (let i = 1; i <= diff; i++)
      res.push([
        a[2] + i * (axis === 2 ? 1 : 0),
        a[0] + i * (axis === 0 ? 1 : 0),
        a[1] + i * (axis === 1 ? 1 : 0),
      ]);
    return res;
  });

let fx = 0, fy = 0, fz = 0;
const build = () => {
  const grid = Array(fz + 1)
      .fill()
      .map(() =>
          Array(fx + 1)
              .fill()
              .map(() => Array(fy + 1).fill(0))
      );
  let i = 1;
  for (const brick of data) {
    for (const block of brick) {
      const [z, x, y] = block;
      grid[z][x][y] = i;
    }
    i++;
  }
  return grid;
};

for (const brick of data) {
  for (const block of brick) {
    const [z, x, y] = block;
    fz = Math.max(fz, z);
    fx = Math.max(fx, x);
    fy = Math.max(fy, y);
  }
}

while (true) {
  const grid = build();
  let isSettled = true;
  top: for (let i = 0; i < data.length; i++) {
    const brick = data[i];
    for (const block of brick) {
      const [z, x, y] = block;
      if (z === 1) continue top;
      if (grid[z - 1][x][y] !== 0 && i !== grid[z - 1][x][y] - 1)
        continue top;
    }
    isSettled = false;
    brick.forEach((_, i) => (brick[i][0] -= 1));
  }
  if (isSettled) break;
}

const grid = build();
const supports = [];
let i = 1;
for (const brick of data) {
  supports[i] = [];
  for (const coord of brick) {
    const [z, x, y] = coord;
    if (grid[z + 1][x][y] &&
        grid[z + 1][x][y] !== i &&
        !supports[i].includes(grid[z + 1][x][y])) {
      supports[i].push(grid[z + 1][x][y]);
    }
  }
  i++;
}
const supported = [];
i = 1;
for (const brick of data) {
  supported[i] = [];
  for (const coord of brick) {
    const [z, x, y] = coord;
    if (grid[z - 1][x][y] &&
        grid[z - 1][x][y] !== i &&
        !supported[i].includes(grid[z - 1][x][y])) {
      supported[i].push(grid[z - 1][x][y]);
    }
  }
  i++;
}

const graph = {};
i = -1;
for (const sup of supports) {
  i++;
  if (!sup) continue;
  if (!graph[i]) {
    graph[i] = {id: i, children: {}};
  }
  for (const s of sup) {
    if (!graph[s]) graph[s] = {id: s, children: {}};
    graph[i].children[s] = graph[s];
  }
}

Object.values(graph).forEach(node => {
  node.supports = [];
  const cur = [node];
  while (cur.length) {
    const n = cur.shift();
    for (const child of Object.values(n.children)) {
      if (supported[child.id].every(e => node.supports.includes(e) || node.id === e) &&
          !node.supports.includes(child.id)) {
        node.supports.push(child.id);
        cur.push(child);
      }
    }
  }
});

console.log(Object.values(graph).reduce((acc, v) => acc + v.supports.length, 0));
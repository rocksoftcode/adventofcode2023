const DIR = {
  '.': {d: ['d'], u: ['u'], l: ['l'], r: ['r']},
  '|': {d: ['d'], u: ['u'], l: ['u', 'd'], r: ['u', 'd']},
  '-': {d: ['r', 'l'], u: ['r', 'l'], l: ['l'], r: ['r']},
  '/': {d: ['l'], u: ['r'], l: ['d'], r: ['u']},
  '\\': {d: ['r'], u: ['l'], l: ['u'], r: ['d']},
};

const next = (curr, d) => {
  if (!curr) {
    return [];
  }
  return DIR[curr][d];
};
const move = (p, d) => {
  const result = {
    y: p.y,
    x: p.x,
  };
  if (d === 'd') {
    result.y += 1;
  } else if (d === 'u') {
    result.y -= 1;
  } else if (d === 'l') {
    result.x -= 1;
  } else if (d === 'r') {
    result.x += 1;
  }
  return result;
};
const go = (grid, s) => {
  let ba = [s];
  const ref = {};
  while (ba.length !== 0) {
    let bn = [];
    for (let y = 0; y < ba.length; y++) {
      const b = ba[y];
      const k = `${b.pos.y}-${b.pos.x}`;
      if (!ref[k]) {
        ref[k] = {};
      }
      ref[k][b.dir] = true;

      const curr = grid[b.pos.y] ? grid[b.pos.y][b.pos.x] : null;
      const n = next(curr, b.dir);
      for (const d of n) {
        const nb = {
          pos: move(b.pos, d),
          dir: d
        };
        if (!grid[nb.pos.y] || !grid[nb.pos.y][nb.pos.x]) {
          continue;
        }
        const nk = `${nb.pos.y}-${nb.pos.x}`;
        if (ref[nk] && ref[nk][d]) {
          continue;
        }
        bn.push(nb);
      }
    }
    ba = bn;
  }
  return Object.keys(ref).length;
};

const input = require('node:fs').readFileSync('./day16.txt', 'utf-8').split('\n').map(l => l.split(''));
const s = [];
for (let y = 0; y < input.length; y++) {
  s.push({pos: {y: y, x: 0}, dir: 'r'});
  s.push({pos: {y: y, x: input[y].length - 1}, dir: 'l'});
}
for (let x = 0; x < input[0].length; x++) {
  s.push({pos: {y: 0, x}, dir: 'd'});
  s.push({pos: {y: input.length - 1, x}, dir: 'u'});
}
let max = 0;
for (const f of s) {
  let r = go(input, f);
  if (r > max) {
    max = r;
  }
}
console.log(max);
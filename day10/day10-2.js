const input = require('node:fs').readFileSync('./day10.txt', 'utf8').split('\n');
let pos = {x: 0, y: 0, type: 'J'};
const map = input.map((val, i) => {
  let row = val.split('');
  let s = row.indexOf('S');
  if (s > -1) {
    pos.x = s;
    pos.y = i;
  }
  row[s] = pos.type;
  return row;
});

const tN = '|JL';
const lN = '-7J';
const bN = '|7F';
const rN = '-LF';

const next = p => {
  if (tN.includes(p.type) && !v.has(`${p.x}-${p.y - 1}`))
    return {x: p.x, y: p.y - 1, type: map[p.y - 1][p.x]};
  if (lN.includes(p.type) && !v.has(`${p.x - 1}-${p.y}`))
    return {x: p.x - 1, y: p.y, type: map[p.y][p.x - 1]};
  if (bN.includes(p.type) && !v.has(`${p.x}-${p.y + 1}`))
    return {x: p.x, y: p.y + 1, type: map[p.y + 1][p.x]};
  if (rN.includes(p.type) && !v.has(`${p.x + 1}-${p.y}`))
    return {x: p.x + 1, y: p.y, type: map[p.y][p.x + 1]};
};

const v = new Set();
while (pos = next(pos)) v.add(`${pos.x}-${pos.y}`);

let tiles = 0;
map.forEach((row, y) => {
  let rM = '';
  row.forEach((t, x) => {
    const b = v.has(`${x}-${y}`);
    if (b) {
      if (t !== '-') rM += t;
    }
    if (!b && (rM.match(/\||L7|FJ/g)?.length ?? 0) % 2) {
      tiles++;
    }
  });
});

console.log(tiles);
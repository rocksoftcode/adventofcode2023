const input = require('node:fs').readFileSync('./day18.txt', 'utf-8')
    .split('\n').map(l => l.split(' ')).map(([i, j]) => [i, +j]);
const dirs = {D: [1, 0], U: [-1, 0], L: [0, -1], R: [0, 1]};
let rp = Number.MIN_VALUE;
let cp = Number.MIN_VALUE;
let r = 0;
let c = 0;
let a = 0;
let p = 0;
for (let i = 0; i < input.length; i++) {
  const dir = dirs[input[i][0]];
  const dist = input[i][1];
  rp = r;
  cp = c;
  r += dir[0] * dist;
  c += dir[1] * dist;
  a += cp * r - c * rp;
  p += dist;
}
console.log(Math.abs(a / 2) + p / 2 + 1);
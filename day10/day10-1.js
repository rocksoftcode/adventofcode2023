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

const next = pos => {
  if (tN.includes(pos.type) && !visited.has(`${pos.x}-${pos.y - 1}`))
    return {x: pos.x, y: pos.y - 1, type: map[pos.y - 1][pos.x]};
  if (lN.includes(pos.type) && !visited.has(`${pos.x - 1}-${pos.y}`))
    return {x: pos.x - 1, y: pos.y, type: map[pos.y][pos.x - 1]};
  if (bN.includes(pos.type) && !visited.has(`${pos.x}-${pos.y + 1}`))
    return {x: pos.x, y: pos.y + 1, type: map[pos.y + 1][pos.x]};
  if (rN.includes(pos.type) && !visited.has(`${pos.x + 1}-${pos.y}`))
    return {x: pos.x + 1, y: pos.y, type: map[pos.y][pos.x + 1]};
}
const visited = new Set();
while (pos = next(pos)) visited.add(`${pos.x}-${pos.y}`)

console.log(visited.size / 2);
const data = require('node:fs').readFileSync('./day24.txt', 'utf-8')
    .split('\n').map((l) => l.split(' @ ')
        .map((e) => e.split(', ').map(n => +n)));

const MIN = 200000000000000;
const MAX = 400000000000000;

const intersection = (x1, y1, x2, y2, x3, y3, x4, y4) => {
  const d = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  if (d === 0) return null;
  const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / d;
  const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / d;
  return {
    x: x1 + ua * (x2 - x1),
    y: y1 + ua * (y2 - y1),
    segment1: ua >= 0 && ua <= 1,
    segment2: ub >= 0 && ub <= 1,
  };
};


let count = 0;
for (let i = 0; i < data.length; i++) {
  const [[pos1x, pos1y], [vel1x, vel1y]] = data[i];
  for (let j = i + 1; j < data.length; j++) {
    const [[pos2x, pos2y], [vel2x, vel2y]] = data[j];
    const intersect = intersection(
        pos1x,
        pos1y,
        pos1x + vel1x,
        pos1y + vel1y,
        pos2x,
        pos2y,
        pos2x + vel2x,
        pos2y + vel2y
    );
    if (!intersect) continue;
    const {x, y} = intersect;
    if (!(x >= MIN && x <= MAX && y >= MIN && y <= MAX) ||
        (!(x - pos1x > 0 === vel1x > 0 && y - pos1y > 0 === vel1y > 0)) ||
        (!(x - pos2x > 0 === vel2x > 0 && y - pos2y > 0 === vel2y > 0))) continue;
    count++;
  }
}

console.log(count);
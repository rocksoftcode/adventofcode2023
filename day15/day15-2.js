const steps = require('node:fs').readFileSync('./day15.txt', 'utf-8').split(',');
const hashCode = s => {
  let current = 0;
  s.split('').forEach(c => {
    current += c.charCodeAt(0);
    current *= 17;
    current %= 256;
  });
  return current;
};

const boxes = [...Array(256)].map(() => []);
steps.forEach(s => {
  let label, lens;
  if (s.includes('-')) {
    label = s.replace('-', '');
    for (let i = 0; i < boxes.length; i++) {
      for (let j = 0; j < boxes[i].length; j++) {
        if (boxes[i][j].split(' ')[0] === label) {
          boxes[i].splice(j, 1);
        }
      }
    }
  }
  if (s.includes('=')) {
    [label, lens] = s.split('=');
    const h = hashCode(label);
    const li = boxes[h].findIndex(l => l.split(' ')[0] === label);
    if (li === -1) {
      boxes[h].push(label + ' ' + lens);
    }
    else {
      boxes[h][li] = label + ' ' + lens;
    }
  }
});

console.log(boxes.reduce((acc, v, i) => acc + (i + 1) *
    v.reduce((ca, cv, j) => ca + (j + 1) * +cv.split(' ')[1], 0), 0));
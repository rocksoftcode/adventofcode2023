const rank = hand => {
  const b = {};
  hand.forEach(c => {
    b[c] = (b[c] || 0) + 1;
  });
  const j = b['J'] || 0;
  if (j) delete b['J'];
  if (j === 5) return 9;
  let n = Object.keys(b).length;
  let max = +Object.values(b).sort().pop() + j;
  return (5 - n) + max;
};

const co = {'J': 0, '2': 1, '3': 2, '4': 3, '5': 4, '6': 5, '7': 6, '8': 7, '9': 8, T: 9, Q: 10, K: 11, A: 12};
const input = require('node:fs').readFileSync('./day7.txt', 'utf-8');
const hands = input.split('\n').map(o => o.split(' ').map((o, i) => i === 0 ? o.split('') : +o));
for (let i = 0; i < hands.length; ++i) {
  hands[i].push(rank(hands[i][0]));
}
hands.sort((a, b) => {
  if (a[2] > b[2]) return 1;
  if (a[2] < b[2]) return -1;
  for (let i = 0; i < 5; ++i) {
    if (co[a[0][i]] < co[b[0][i]]) return -1;
    if (co[a[0][i]] > co[b[0][i]]) return 1;
  }
  return 0;
});

console.log(hands.reduce((v, o, i) => v + o[1] * (i + 1), 0));
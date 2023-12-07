const rank = hand => {
  const b = {};
  hand.forEach(c => {
    b[c] = (b[c] || 0) + 1;
  });
  let n = Object.keys(b).length;
  let max = +Object.values(b).sort().pop();
  return (5 - n) + max;
};
const co = {'2': 0, '3': 1, '4': 2, '5': 3, '6': 4, '7': 5, '8': 6, '9': 7, T: 8, J: 9, Q: 10, K: 11, A: 12};
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
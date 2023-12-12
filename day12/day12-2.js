const raw = require('node:fs').readFileSync('./day12.txt', 'utf-8');
const input = raw.split('\n').map((line) => line.split(' ')).map(l => [
  Array(5).fill(l[0]).join('?').split(''),
  Array(5).fill(l[1].split(',').map(c => +c)).flat()
]);

const poss = (ref, n, f, idxN, idxF, idxG) => {
  const key = idxN + ',' + idxF + ',' + idxG;
  if (key in ref) return ref[key];
  if (idxN === n.length) {
    if (idxF === f.length && idxG === 0) return 1;
    if (idxF === f.length - 1 && f[idxF] === idxG) return 1;
    return 0;
  }
  let out = 0;
  if (n[idxN] === '#' || n[idxN] === '?')
    out += poss(ref, n, f, idxN + 1, idxF, idxG + 1);
  if (n[idxN] === '.' || n[idxN] === '?') {
    if (idxG === 0) out += poss(ref, n, f, idxN + 1, idxF, 0);
    if (idxG > 0 && idxF < f.length && f[idxF] === idxG)
      out += poss(ref, n, f, idxN + 1, idxF + 1, 0);
  }
  return (ref[key] = out);
}

console.log(input.map(n => poss({}, ...n, 0, 0, 0)).reduce((arr, v) => arr + v, 0));
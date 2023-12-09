const diff = arr => {
  const out = [];
  for (let i = 1; i < arr.length; i++) {
    out.push(arr[i] - arr[i - 1]);
  }
  return out;
};
const input = require('node:fs').readFileSync('./day9.txt', 'utf8');
const lines = input.split('\n').map(i => {
  const row = [];
  let values = i.split(' ').map(x => +x);
  row.push(values);
  do {
    values = diff(values);
    row.push(values);
  } while (!values.every(i => i === 0));
  for (let i = row.length - 2; i >= 0; i--) {
    const nextL = row[i + 1].at(-1);
    const currL = row[i].at(-1);
    const nextF = row[i + 1][0];
    const currF = row[i][0];
    row[i].push(nextL + currL);
    row[i].unshift(currF - nextF);
  }

  return row;
});
console.log(lines.reduce((acc, v) => acc + v[0][0], 0));
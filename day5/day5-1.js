const input = require('node:fs').readFileSync('./day5.txt', 'utf8').split('\n\n');
const numbers = l => {
  const numbers = l.match(/(\d+)/gm)?.map(v => +v);
  if (!numbers) return [];
  return numbers;
};
const ranges = input.map((v) => {
  const set = v.split('\n');
  return {
    type: set[0],
    val: set.slice(1)
        .map(v => {
          const [startDest, startSrc, size] = numbers(v);
          return {startDest, startSrc, size};
        })
  };
});

let seeds = numbers(input.shift());
for (const range of ranges) {
  seeds = seeds.map(from => {
    for (const r of range.val) {
      if (from >= r.startSrc && from <= r.startSrc + r.size - 1) {
        return from - r.startSrc + r.startDest;
      }
    }
    return from;
  });
}
console.log(Math.min(...seeds));
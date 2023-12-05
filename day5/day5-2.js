const input = require('node:fs').readFileSync('./day5.txt', 'utf8').split('\n\n');
const numbers = l => {
  const numbers = l.match(/(\d+)/gm)?.map(v => +v);
  if (!numbers) return [];
  return numbers;
};

const seeds = numbers(input.shift());
const ranges = input.map((v) => {
  const set = v.split('\n');
  return {
    type: set[0],
    val: set
        .slice(1)
        .map(v => {
          const [startDest, startSrc, size] = numbers(v);
          return {startDest, startSrc, size};
        })
  };
});

const chunk = (arr, size = 1) => {
  size = Math.max(+size, 0);
  const length = arr == null ? 0 : arr.length;
  if (!length || size < 1) {
    return [];
  }
  let index = 0;
  let r = 0;
  const out = new Array(Math.ceil(length / size));
  while (index < length) {
    out[r++] = arr.slice(index, (index += size));
  }
  return out;
};

let pairs = chunk(seeds, 2).map(v => ({start: v[0], size: v[1]}));
for (const range of ranges) {
  const tmp = [];
  const sortedRange = range.val.sort((a, b) => a.startSrc - b.startSrc);
  for (const pair of pairs) {
    const pairs = [];
    let ref = pair.start;

    const lenLeft = ref => pair.size - (ref - pair.start);
    while (ref <= pair.start + pair.size - 1) {
      let start;
      let size;

      for (const r of sortedRange) {
        const rEnd = r.startSrc + r.size - 1;
        const rOffset = -r.startSrc + r.startDest;
        if (ref >= r.startSrc &&
            ref <= rEnd &&
            !start) {
          start = ref + rOffset;
          const exLen = lenLeft(r.startSrc) - lenLeft(ref);

          if (r.size - exLen >= lenLeft(ref)) {
            size = lenLeft(ref);
            ref = Infinity;
          } else {
            size = r.size - exLen;
            ref += r.size - exLen;
          }
        }

        if (ref + lenLeft(ref) >= r.startSrc && ref <= rEnd && !start) {
          pairs.push({start: ref, size: r.startSrc - ref});
          start = r.startSrc + rOffset;
          ref = r.startSrc;

          if (r.size >= lenLeft(ref)) {
            size = lenLeft(ref);
            ref = Infinity;
          } else {
            size = r.size;
            ref += r.size;
          }
        }
      }
      if (!start) {
        start = ref;
        size = lenLeft(ref);
        ref = Infinity;
      }
      pairs.push({start, size});
    }
    tmp.push(...pairs);
  }
  pairs = tmp;
}
console.log(Math.min(...pairs.map((v) => v.start)));
const inst = {};

const range = (cmp, bound, v, vm) => {
  if (cmp === '<') return [v, Math.min(bound - 1, vm)];
  if (cmp === '>') return [Math.max(bound + 1, v), vm];
  if (cmp === '<=') return [v, Math.min(bound, vm)];
  if (cmp === '>=') return [Math.max(bound, v), vm];
}

const ranges = (cat, cmp, bound, ranges) => {
  const mCat = `${cat}m`;
  const [v, vm] = range(cmp, bound, ranges[cat], ranges[mCat]);
  ranges[cat] = v;
  ranges[mCat] = vm;
  return ranges;
}

const xop = cmp => {
  if (cmp === '>') return '<=';
  if (cmp === '<') return '>=';
}

require('node:fs').readFileSync('./day19.txt', 'utf-8')
  .split('\n\n')[0]
  .split('\n')
  .forEach((workflow) => {
    let [_, n, steps] = workflow.match(/(.+){(.+)}/);
    steps = steps.split(',').map((p) => {
      const match = p.match(/(?<cat>[xmas])(?<cmp>[<>])(?<bound>\d+):(?<next>.*)/);
      if (!match) return p;
      const {cat, cmp, bound, next} = match.groups;
      return {cat, cmp, bound: +bound, next};
    });
    inst[n] = steps;
  });

let sum = 0;
const q = [[
  'in',
  {x: 1, xm: 4000, m: 1, mm: 4000, a: 1, am: 4000, s: 1, sm: 4000},
]];
while (q.length) {
  let [state, {x, xm, m, mm, a, am, s, sm}] = q.pop();
  if (state === 'A') {
    sum += (xm - x + 1) * (mm - m + 1) * (am - a + 1) * (sm - s + 1);
    continue;
  }
  if (state === 'R') continue;
  if (x > xm || m > mm || a > am || s > sm) continue;
  for (const cond of inst[state]) {
    if (typeof cond === 'string') {
      q.push([cond, {x, xm, m, mm, a, am, s, sm}]);
      break;
    }
    const {cat, cmp, bound, next} = cond;
    q.push([next, ranges(cat, cmp, bound, {x, xm, m, mm, a, am, s, sm})]);
    const range = ranges(cat, xop(cmp), bound, {x, xm, m, mm, a, am, s, sm});
    x = range.x;
    xm = range.xm;
    m = range.m;
    mm = range.mm;
    a = range.a;
    am = range.am;
    s = range.s;
    sm = range.sm;
  }
}

console.log(sum);

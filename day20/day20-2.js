const mods = {};
const inputs = {};
require('node:fs').readFileSync('./day20.txt', 'utf-8').split('\n').forEach(l => {
  const {
    groups: {type, key, module},
  } = l.match(/(?<type>[%&]?)(?<key>.+) -> (?<module>.+)/);
  mods[key] = {type, to: module.split(', '), s: 0};
  module.split(', ').forEach(m => {
    inputs[m] ??= {};
    inputs[m][key] = 0;
  });
});

const lcm = (a, b) => (a / gcd(a, b)) * b;
const gcd = (a, b) => {
  let d = 0;
  if (a < b) {
    d = b;
    b = a;
    a = d;
  }
  d = a % b;
  return d ? gcd(b, d) : b;
};

const sum = [0, 0];
const queue = [];
const p = Object.keys(inputs.rx).flatMap((k) => Object.keys(inputs[k]));
for (let i = 1; i < Infinity; i++) {
  sum[0]++;
  queue.push(['button', 'broadcaster', 0]);
  while (queue.length) {
    const [from, module, pulse] = queue.shift();
    if (!mods[module]) continue;
    const {type, to, s} = mods[module];
    if (module === 'broadcaster') {
      for (const m of to) queue.push([module, m, pulse]), sum[pulse]++;
    } else if (type === '%' && pulse === 0) {
      mods[module].s = s ? 0 : 1;
      const nPulse = s ? 0 : 1;
      for (const m of mods[module].to)
        queue.push([module, m, nPulse]), sum[nPulse]++;
    } else if (type === '&') {
      inputs[module][from] = pulse;
      const nPulse = Object.values(inputs[module]).every(Boolean) ? 0 : 1;
      if (nPulse === 1 && p.includes(module))
        p[p.indexOf(module)] = i;
      for (const m of to) queue.push([module, m, nPulse]), sum[nPulse]++;
    }
  }
  if (p.every((e) => typeof e === 'number')) break;
}
console.log(p.reduce((acc, cur) => lcm(acc, cur), 1));


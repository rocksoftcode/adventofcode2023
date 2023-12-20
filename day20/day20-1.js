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

const sums = [0, 0];
const q = [];
for (let i = 0; i < 1000; i++) {
  sums[0]++;
  q.push(['button', 'broadcaster', 0]);
  while (q.length) {
    let [from, module, pulse] = q.shift();
    if (module === 'output') continue;
    if (module === 'rx') continue;
    const {type, to, s} = mods[module];
    if (module === 'broadcaster') {
      for (const m of to) {
        q.push([module, m, pulse]);
        sums[pulse]++;
      }
    } else if (type === '%' && pulse === 0) {
      mods[module].s = s ? 0 : 1;
      const tPulse = s ? 0 : 1;
      for (const m of mods[module].to) {
        q.push([module, m, tPulse]);
        sums[tPulse]++;
      }
    } else if (type === '&') {
      inputs[module][from] = pulse;
      const tPulse = Object.values(inputs[module]).every(Boolean) ? 0 : 1;
      for (const m of to) {
        q.push([module, m, tPulse]);
        sums[tPulse]++;
      }
    }
  }
}

console.log(sums[0] * sums[1]);
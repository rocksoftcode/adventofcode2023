const lcm = (a, b) => (a * b) / gcd(a, b);
const gcd = (a, b) => (b === 0) ? a : gcd(b, a % b);
const findLcm = routes => {
  let mult = routes[0];
  for (let n = 1; n < routes.length; n++) {
    mult = lcm(mult, routes[n]);
  }
  return mult;
};

const data = require('node:fs').readFileSync('./day8.txt', 'utf-8').split('\n\n');
const seq = data[0].split('');
const nodes = new Map(data[1].split('\n')
    .map(l => l.replaceAll(/[^A-Z\s]+/g, '')
        .split(/\s+/)).map(n => [n[0], {L: n[1], R: n[2]}]));

const steps = n => {
  let totalSteps = 0;
  let seqStep = 0;
  let currentNode = n;
  while (currentNode[2] !== 'Z') {
    currentNode = nodes.get(currentNode)[seq[seqStep++]];
    totalSteps++;
    if (seqStep === seq.length) seqStep = 0;
  }
  return totalSteps;
};

const all = [];
for (const n of nodes.keys()) {
  if (n[2] !== 'A') {
    continue;
  }
  all.push(steps(n));
}
console.log(findLcm(all));

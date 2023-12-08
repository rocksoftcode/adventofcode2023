const data = require('node:fs').readFileSync('./day8.txt', 'utf-8').split('\n\n');
const seq = data[0].split('');
const start = 'AAA';
const nodes = new Map(data[1].split('\n')
    .map(l => l.replaceAll(/[^A-Z\s]+/g, '')
        .split(/\s+/)).map(n => [n[0], {L: n[1], R: n[2]}]));
let totalSteps = 0;
let seqStep = 0;
let currentNode = start;
while (currentNode !== 'ZZZ') {
  currentNode = nodes.get(currentNode)[seq[seqStep++]];
  totalSteps++;
  if (seqStep === seq.length) seqStep = 0;
}
console.log(totalSteps);
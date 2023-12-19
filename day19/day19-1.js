let input = require('node:fs').readFileSync('./day19.txt', 'utf-8').split('\n\n').map(p => p.split('\n'));
const rules = Object.fromEntries(input[0].map(r => {
  const l = r.match(/([a-z]+)\{(.*)}/);
  l[2] = l[2].split(',')
  return l.splice(1);
}));
const parts = input[1].map(l => Object.fromEntries(l.substring(1).slice(0, -1).split(',').map(p => {
  const v = p.split('=');
  return [v[0], +v[1]];
})));

let tot = p => Object.values(p).reduce((acc, v) => acc + v, 0);
let accepts = [];

next: for (const part of parts) {
  let c = 'in';

  while (true) {
    if (c === 'A') {
      accepts.push(parts.indexOf(part));
      continue next;
    }
    else if (c === 'R') continue next;
    else {
      for (const rule of rules[c]) {
        if (rule.indexOf(':') === -1) {
          c = rule;
          break;
        }

        const [when, then] = rule.split(':');
        if (eval(`part.${when}`)) {
          c = then;
          break;
        }
      }
    }
  }
}

console.log([...accepts].reduce((acc, v) => acc + tot(parts[v]), 0));
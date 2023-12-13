const data = require('node:fs').readFileSync('./day13.txt', 'utf-8')
    .split('\n\n')
    .map(g => g.split('\n').map(l => l.split('')));

const result = data
  .map(g => [g, g[0].map((__, i) => g.map(r => r[i]))])
  .map(gs => {
    return gs.map(g => {
      let d = 0;
      let accS = 0;
      let accT = 0;
      let t;
      for (let u = 0.5; u < g.length; u++) {
        t = 0.5;
        d = 0;
        while (true) {
          if (u - t < 0 || u + t >= g.length) break;
          d += g[u - t].filter((c, j) => c !== g[u + t][j]).length;
          t++;
        }
        if (t > 0.5 && (u - t === -1 || u + t === g.length) && d === 0) {
          accS = u + 0.5;
        }
        accT = t;
      }
      return accS;
    });
  })
  .reduce((acc, v) => acc + v[0] * 100 + v[1], 0);

console.log(result);
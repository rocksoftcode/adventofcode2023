const fs = require('node:fs');
const maxColor = (c, g) =>
    [...g.matchAll(new RegExp(`(\\d+) ${c}`, 'g'))]
        .map(m => +m[1])
        .reduce((acc, v) => Math.max(acc, v), 0);
const games = fs.readFileSync('./day2.txt', 'utf-8')
    .split('\n')
    .map((l, i) => {
      const turns = l.split(': ')[1];
      return ({
        red: maxColor('red', turns),
        blue: maxColor('blue', turns),
        green: maxColor('green', turns)
      });
    });
console.log(Object.keys(games)
    .filter(k => games[k].red <= 12 && games[k].green <= 13 && games[k].blue <= 14)
    .map(k => +k+1)
    .reduce((acc, v) => acc + v, 0)
);

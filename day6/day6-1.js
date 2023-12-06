const fs = require('node:fs');
const lines = fs.readFileSync('./day6.txt', 'utf-8').split('\n');
const times = lines[0].match(/(\d+)/gm)?.map(v => +v);
const distances = lines[1].match(/(\d+)/gm)?.map(v => +v);
const simulate = race => {
  let speed = 0;
  let distance = 0;
  let timer = times[race];
  let wins = 0;
  while (timer > 0) {
    distance = speed * timer;
    timer--;
    speed++;
    if (distance > distances[race]) wins++;
  }
  return wins;
}
let wins = []
for (let i = 0; i < times.length; i++) {
  wins.push(simulate(i));
}
console.log(wins.reduce((acc, v) => acc * v, 1));
const fs = require('node:fs');
const lines = fs.readFileSync('./day6.txt', 'utf-8').split('\n');
const time = +lines[0].match(/(\d+)/gm)?.join('');
const distance = +lines[1].match(/(\d+)/gm).join('');

let speed = 0;
let dist = 0;
let timer = time;
let wins = 0;
while (timer > 0) {
  dist = speed++ * timer--;
  if (dist > distance) wins++;
}
console.log(wins);
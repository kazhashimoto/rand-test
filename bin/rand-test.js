#!/usr/bin/env node

const mt19937 = require('@stdlib/random-base-mt19937');
const rand = mt19937.factory();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(rand.normalized() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function generate(x, y) {
  const stat = [];
  for (let i = x; i <= y; i++) {
    stat[i - x] = 0;
  }
  for (let i = 0; i < 20; i++) {
    // const base = getRandomInt(0, 4096 * (y - x + 1));
    const base = rand();
    const n  = x +  base % (y - x + 1);
    stat[n - x]++;
  }
  return stat;
}

for (let i = 0; i < 20; i++) {
  let stat = generate(0, 5);
  console.log(stat);
  let range = Math.max(...stat) - Math.min(...stat);
  console.log('range=', range);
}

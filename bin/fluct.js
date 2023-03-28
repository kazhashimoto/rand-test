#!/usr/bin/env node
const { program } = require("commander");

const MersenneTwister = require('mersenne-twister');
const mt = new MersenneTwister();

program
  .name('fluct')
  .version('1.0.0')
  .usage('[options] base delta [count]')
  .showHelpAfterError()
  .option('-d', 'debug random numbers generated');

program.parse(process.argv);
const options = program.opts();
if (program.args.length < 2) {
  program.error('base and delta values must be specified.');
}

const param = {
  base: parseInt(program.args[0]),
  delta: parseInt(program.args[1]),
  count: (program.args.length > 2)? parseInt(program.args[2]): 100
};

console.log(param);

function fluctuation(base, delta) {
  let r;
  let d = 0;
  for (; d < delta; d++) {
    r = mt.random();
    if (r > 0.25 && r <= 0.75) {
      break;
    }
  }
  r = mt.random();
  if (r > 0.25 && r <= 0.75) {
    d = -d;
  }
  base += d;
  return (base < 0)? 0: base;
}

const stat = new Array(20).fill(0);
for (let i = 0; i < param.count; i++) {
  let n = fluctuation(param.base, param.delta);
  stat[n]++;
}

console.log(stat);

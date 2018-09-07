'use strict';

const raspInfo = require('raspberry-info');
const chalk = require('chalk');
const clear = require('clear');
const process = require('process');
const app = require('./package.json');

function showDetails() {
  let cpuTemp, gpuTemp;
  const isItLinux = process.platform === 'linux';

  console.log('Initializing...');

  setInterval(async () => {
    cpuTemp = await raspInfo.getCPUTemperature();
    gpuTemp = await raspInfo.getGPUTemperature();

    clear();
    console.log();

    console.log(
      chalk.white.bgBlack.bold(
        `██████████████████░░ Raspberry Bash Info ${
          app.version
        } ░░██████████████████`
      )
    );

    console.log(`${chalk.cyan.bold('CPU Temp:')} ${chalk.green(cpuTemp)}`);
    console.log(`${chalk.cyan.bold('GPU Temp:')} ${chalk.green(gpuTemp)}`);
    if (!isItLinux)
      console.log(chalk.red.bold("Warning: That's not a Linux OS!"));
  }, 1000);
}

module.exports = showDetails();

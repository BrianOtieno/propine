#! /usr/bin/env node
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import minimist from 'minimist';
import inquirer from 'inquirer';
import { Command } from 'commander';

clear();

console.log(
    chalk.blue.bold(
        figlet.textSync('Propine CLI', { horizontalLayout: 'full' })
    )
);

console.log(chalk.green(
    'Welcome to Propine ' +
    chalk.blue.underline.bold('CLI Application') +
    ' where you can make quick Crypto enquiries!'
));

console.log(chalk.green(
    'Below are the  ' +
    chalk.red.underline.bold('Arguments') +
    ' you can pass'
));


console.log(`
${chalk.blue.bold('--------------------------------------------------------')}
${chalk.yellow('TOKEN :')} ${chalk.red('Example: --token=ETH')}
${chalk.yellow('DATE :')} ${chalk.red('Example --date=17-07-2022')}
${chalk.yellow('TOKEN & TOKEN:')} ${chalk.red('Example: --date=17-07-2022 --token=ETH')}
${chalk.yellow('HELP :')} ${chalk.red('--help')}
${chalk.blue.bold('--------------------------------------------------------')}
`);

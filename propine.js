#!/usr/bin/env node

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

console.log(chalk.green.bold(
    'Welcome to Propine ' +
    chalk.blue.underline.bold('CLI Application') +
    ' where you can make quick Crypto enquiries!'
));

console.log(chalk.green.bold(
    'Below are the  ' +
    chalk.red.underline.bold('Arguments') +
    ' you can pass'
));


console.log(`
${chalk.blue.bold('--------------------------------------------------------')}
${chalk.yellow('TOKEN :')} ${chalk.red.bold('Example: --token=ETH')}
${chalk.yellow('DATE :')} ${chalk.red.bold('Example --date=17-07-2022')}
${chalk.yellow('TOKEN & TOKEN:')} ${chalk.red.bold('Example: --date=17-07-2022 --token=ETH')}
${chalk.yellow('HELP :')} ${chalk.red.bold('--help')}
${chalk.blue.bold('--------------------------------------------------------')}
`);


const program = new Command();

program.description("Propine Crypto CLI Application");
program.name("propine");
program.option('-d, --date', 'Add Date to the query API');
program.option('-t, --token', 'Add Token to the query API');

// program.parse(process.argv);

// get input from terminal
const args = minimist(process.argv.slice(2));
const token = args.token;
const date = args.date


if (token && date) {
    // return the portfolio value of token in USD for the date
    console.log(token, date);
}
else if (typeof token !== 'undefined' && token) {
    // return the latest portfolio value for token in USD
    // 
    console.log(token);
}
else if (typeof date !== 'undefined' && date) {
    console.log(date);
}
else {
    // return the latest portfolio value per token in USD
    console.log("no flag set")
}

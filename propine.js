#!/usr/bin/env node

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import minimist from 'minimist';
import inquirer from 'inquirer';
import { Command } from 'commander';
import moment from 'moment'
import { isValidDate } from './propine/validationHelper.js';
import { header } from './propine/header.js';
import { portfolioTokenValue, portfolioTokenValueByDate, tokenAndDate, tokenValue } from './propine/portfolio.js';
// import { tokenRate, tokenRates } from './propine/rates.js';

header()
// console.table(tokenRate("ETH", "USD"));
// console.table(tokenRates(["ETH", "BTC", "XRP"], ["USD", "EUR", "JPY"]))

const program = new Command();

program
    .description("Propine Crypto CLI Application")
    .name("propine")
    .option('-d, --date', 'Add Date to the query API')
    .option('-t, --token', 'Add Token to the query API')

// get input from terminal
const args = minimist(process.argv.slice(2));
const token = args.token;
const date = args.date;
// console.log(token, date);


if (token && date) { //both date and token 
    isValidDate(date)  // validate date  
    tokenAndDate(token, date);
}
else if (typeof token !== 'undefined' && token) {
    tokenValue(token) //return the latest portfolio value for token in USD 
}
else if (typeof date !== 'undefined' && date)
    isValidDate(date) && portfolioTokenValueByDate(date); //validate date  

else portfolioTokenValue(); //return the latest portfolio value per token in USD 


// program.parse(process.argv);

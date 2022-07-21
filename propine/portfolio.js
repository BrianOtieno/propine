import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import moment from 'moment'
import { tokenRate, tokensPortfolio } from './rates.js';

const __dirname = path.resolve();

export const portfolioTokenValue = () => {
    const transactions = []
    fs.createReadStream(path.join(__dirname, 'transactions.csv'))
        .pipe(csv())
        .on('data', (row) => {
            const transaction = {
                timestamp: row.timestamp,
                transaction_type: row.transaction_type,
                token: row.token,
                amount: row.transaction_type === "DEPOSIT" ?
                    Math.abs(row.amount) : // positive amount for Deposits
                    -Math.abs(row.amount) // negative amount for Withdrawals
            }
            transactions.push(transaction)
        })
        .on("error", err => {
            console.log(err);
        })
        .on('end', () => {
            // console.table(transactions)
            const portfolioBalance = []
            transactions.reduce((res, value) => {
                if (!res[value.token]) {
                    res[value.token] = {
                        token: value.token,
                        amount: 0,
                    };
                    portfolioBalance.push(res[value.token])
                }
                res[value.token].amount += value.amount;
                return res;
            }, {});

            let tokenList = [];
            portfolioBalance.forEach((item) => {
                tokenList.push(item.token);
            });
            tokenList && console.log("List of Tokens Found in CSV Database: " + tokenList);

            portfolioBalance.length > 0 &&
                console.log(chalk.hex('#DEADED').bold('================ CONVERTING TO USD ================'));

            tokensPortfolio(tokenList, "USD", portfolioBalance); //convert to usd
        })
}

export const tokenValue = async (token) => {
    const transactions = []
    fs.createReadStream(path.join(__dirname, 'transactions.csv'))
        .pipe(csv())
        .on('data', (row) => {
            const transaction = {
                timestamp: moment.unix(row.timestamp).format("YYYY-MM-DD"),
                transaction_type: row.transaction_type,
                token: row.token,
                amount: row.transaction_type === "DEPOSIT" ?
                    Math.abs(row.amount) : // positive amount for Deposits
                    -Math.abs(row.amount) // negative amount for Withdrawals
            }
            transactions.push(transaction)
        })
        .on("error", err => {
            console.log(err);
        })
        .on('end', () => {
            // console.table(transactions)
            const portfolioBalance = []
            transactions.reduce((res, value) => {
                if (!res[value.token]) {
                    res[value.token] = {
                        token: value.token,
                        amount: 0,
                    };
                    portfolioBalance.push(res[value.token])
                }
                res[value.token].amount += value.amount;
                return res;
            }, {});

            const tokenPortfolio = portfolioBalance
                .filter(portfolioBalance => portfolioBalance.token === token);

            tokenRate(token, "USD", tokenPortfolio)
        })
}

export const tokenAndDate = async (token, date) => {
    const transactions = []
    fs.createReadStream(path.join(__dirname, 'transactions.csv'))
        .pipe(csv())
        .on('data', (row) => {
            const transaction = {
                timestamp: moment.unix(row.timestamp).format("YYYY-MM-DD"),
                transaction_type: row.transaction_type,
                token: row.token,
                amount: row.transaction_type === "DEPOSIT" ?
                    Math.abs(row.amount) : // positive amount for Deposits
                    -Math.abs(row.amount) // negative amount for Withdrawals
            }
            transactions.push(transaction)
        })
        .on("error", err => {
            console.log(err);
        })
        .on('end', () => {
            // console.log(transactions)
            const portfolioBalance = []
            transactions.reduce((res, value) => {
                if (!res[value.token]) {
                    res[value.token] = {
                        token: value.token,
                        amount: 0,
                        timestamp: value.timestamp
                    };

                    value.timestamp <= date && portfolioBalance.push(res[value.token]) // push only data in required date range


                }
                res[value.token].amount += value.amount;
                return res;
            }, {});

            const tokenPortfolio = portfolioBalance
                .filter(portfolioBalance => portfolioBalance.token === token)
            // .filter(portfolioBalance => portfolioBalance.timestamp <= date); 


            tokenRate(token, "USD", tokenPortfolio)
        })
}

export const portfolioTokenValueByDate = (date) => {
    const transactions = []
    fs.createReadStream(path.join(__dirname, 'transactions.csv'))
        .pipe(csv())
        .on('data', (row) => {
            const transaction = {
                timestamp: moment.unix(row.timestamp).format("YYYY-MM-DD"), //moment(row.timestamp).format("YYYY/MM/DD"),
                transaction_type: row.transaction_type,
                token: row.token,
                amount: row.transaction_type === "DEPOSIT" ?
                    Math.abs(row.amount) : // positive amount for Deposits
                    -Math.abs(row.amount) // negative amount for Withdrawals
            }
            // if (moment(row.timestamp, 'YYYY-MM-DD').toDate() < moment(date, 'YYYY-MM-DD').toDate()) {
            transactions.push(transaction)
            // }
        })
        .on("error", err => {
            console.log(err);
        })
        .on('end', () => {
            // console.table(transactions)
            const portfolioBalance = []
            transactions.reduce((res, value) => {
                if (!res[value.token]) {
                    res[value.token] = {
                        token: value.token,
                        date: value.timestamp,
                        amount: 0,
                        rate: 0
                    };
                    value.timestamp <= date && portfolioBalance.push(res[value.token])
                }
                res[value.token].amount += value.amount;
                res[value.token].timestamp = value.timestamp;
                return res;
            }, {});

            // Checking for dups, should be none - O'Brien Otieno
            const data = portfolioBalance.filter((obj, pos, portfolioBalance) => {
                return portfolioBalance
                    .map(mapObj => mapObj.token)
                    .indexOf(obj.token) == pos;
            })
            console.table(data);

            //retrieve list of tokens in CSV database. - O'Brien Otieno
            let tokenList = [];
            data.forEach((item) => {
                tokenList.push(item.token);
            });
            tokenList && console.log("List of Tokens Found in CSV Database: " + tokenList);

            //    tokensPortfolio().filter(portfolioBalance => portfolioBalance.last_transaction <= date); // already filtered!
            // convert to USD

            portfolioBalance.length > 0 &&
                console.log(chalk.hex('#DEADED').bold('================ CONVERTING TO USD ================'));

            tokensPortfolio(tokenList, "USD", portfolioBalance); //convert to usd
        })
}

import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import moment from 'moment'
import { tokenRate } from './rates.js';

const __dirname = path.resolve();

export const portfolioTokenValue = () => {
    const transactions = []
    fs.createReadStream(path.join(__dirname, 'transactions.csv'))
        .pipe(csv())
        .on('data', function (row) {
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
        .on('end', function () {
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

            //TO DO ADD Exchange Rate (USD Column) From CryptoCompare - rate x token value
            // tokenRate(token, "USD", tokenPortfolio)

            portfolioBalance.length > 0 && console.table(portfolioBalance)
            !portfolioBalance.length > 0 && console.log(chalk.hex('#DEADED').bold('No porfolio data available'));
        })
}

export const tokenValue = async (token) => {
    const transactions = []
    fs.createReadStream(path.join(__dirname, 'transactions.csv'))
        .pipe(csv())
        .on('data', function (row) {
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
        .on('end', function () {
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
        .on('data', function (row) {
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
        .on('end', function () {
            // console.log(transactions)
            const portfolioBalance = []
            transactions.reduce((res, value) => {
                if (!res[value.token]) {
                    res[value.token] = {
                        token: value.token,
                        amount: 0,
                        timestamp: value.timestamp
                    };
                    console.log(value.timestamp, date)
                    value.timestamp <= date && portfolioBalance.push(res[value.token]) // push only data in required date range


                }
                res[value.token].amount += value.amount;
                return res;
            }, {});
            console.log(portfolioBalance.timestamp)

            const tokenPortfolio = portfolioBalance
                .filter(portfolioBalance => portfolioBalance.token === token)
            // .filter(portfolioBalance => portfolioBalance.timestamp <= date);
            console.log(date, portfolioBalance.timestamp)


            tokenRate(token, "USD", tokenPortfolio)
        })
}

export const portfolioTokenValueByDate = (date) => {
    const transactions = []
    fs.createReadStream(path.join(__dirname, 'transactions.csv'))
        .pipe(csv())
        .on('data', function (row) {
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
            console.log(transaction)
            // }
        })
        .on("error", err => {
            console.log(err);
        })
        .on('end', function () {
            console.table(transactions)
            const portfolioBalance = []
            transactions.reduce((res, value) => {
                if (!res[value.token]) {
                    res[value.token] = {
                        token: value.token,
                        date: value.timestamp,
                        amount: 0,
                    };
                    portfolioBalance.push(res[value.token])
                }
                res[value.token].amount += value.amount;
                res[value.token].timestamp = value.timestamp;
                return res;
            }, {});

            //TO DO ADD Exchange Rate (USD Column) From CryptoCompare - rate x token value
            // console.log(moment(1571967208)) 
            console.log(moment.unix(1571967208).format("MM/DD/YYYY"))
            const tokenPortfolio = portfolioBalance;
            // .filter(portfolioBalance => portfolioBalance.last_transaction <= date);

            (tokenPortfolio.length > 0) ?
                console.table(tokenPortfolio) :
                console.log(chalk.hex('#DEADED').bold('No porfolio data available'));
        })
}

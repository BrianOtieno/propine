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

            const tokenPortfolio = portfolioBalance
                .filter(portfolioBalance => portfolioBalance.token === token);
            // let tokenInUSD = 0;
            // tokenPortfolio.forEach(function (item) {
            //     // console.log("==>" + item.amount);
            //     tokenInUSD = item.amount * 3;
            // });
            // console.log(tokenInUSD);
            // tokenPortfolio["USD"] = tokenPortfolio["amount"] * tokenRate(token, "USD")

            tokenRate(token, "USD", tokenPortfolio)

            // tokenPortfolio.push({ usd: tokenInUSD })
            // //TO DO ADD Exchange Rate (USD Column) From CryptoCompare - rate x token value

            // tokenPortfolio.length > 0 ? console.table(tokenPortfolio) :
            //     console.log(chalk.hex('#DEADED').bold('No token data available for that token'));
        })
}

export const portfolioTokenValueByDate = (date) => {
    const transactions = []
    fs.createReadStream(path.join(__dirname, 'transactions.csv'))
        .pipe(csv())
        .on('data', function (row) {
            const transaction = {
                timestamp: moment(row.timestamp, 'YYYY-MM-DD').toDate(),
                transaction_type: row.transaction_type,
                token: row.token,
                amount: row.transaction_type === "DEPOSIT" ?
                    Math.abs(row.amount) : // positive amount for Deposits
                    -Math.abs(row.amount) // negative amount for Withdrawals
            }
            if (moment(row.timestamp, 'YYYY-MM-DD').toDate() < moment(date, 'YYYY-MM-DD').toDate()) {
                transactions.push(transaction)
                console.log(true)
                console.log("in csv " + moment(row.timestamp, 'YYYY-MM-DD').toDate(), moment(date).format('YYYY-MM-DD'))
            }
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
                        token: value.timestamp,
                        token: value.token,
                        amount: 0,
                    };
                    portfolioBalance.push(res[value.token])
                }
                res[value.token].amount += value.amount;
                res[value.token].date = date;
                res[value.token].last_transaction = moment(value.timestamp).format('L');
                return res;
            }, {});

            //TO DO ADD Exchange Rate (USD Column) From CryptoCompare - rate x token value

            const tokenPortfolio = portfolioBalance;
            // .filter(portfolioBalance => portfolioBalance.last_transaction <= date);

            (tokenPortfolio.length > 0) ?
                console.table(tokenPortfolio) :
                console.log(chalk.hex('#DEADED').bold('No porfolio data available'));
        })
}

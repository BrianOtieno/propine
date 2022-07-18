import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';

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

            portfolioBalance && console.table(portfolioBalance)
        })
}

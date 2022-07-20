import fetch from "node-fetch";
import chalk from "chalk";

export const tokenRate = (token, currency, tokenPortfolio) => {
    // if (token) { url += `${token}`;}

    // cryptocompare API base URL for token prices
    const BASE_URL = "https://min-api.cryptocompare.com/data/price?fsym="
    const API_KEY = "4aa7b33d99d9d58782455f766ea79b2c3fce2d566167575c0bf726d319526f68";
    const RATES_URL = BASE_URL + token + `&tsyms=` + currency + `&api_key=` + API_KEY

    fetch(RATES_URL).then(async (response) => {
        const data = await response.json();
        let tokenAmount = 0;
        tokenPortfolio.forEach(function (item) {
            // console.log("==>" + item.amount);
            tokenAmount = item.amount;
        });

        const usdTokenAmount = tokenAmount * parseFloat(JSON.stringify(data.USD)).toFixed(2);
        // Two decimal places for USD currency. Push only if there are Tx data available
        tokenPortfolio.length > 0 && tokenPortfolio.push({ "usd rate": 1 * parseFloat(data.USD).toFixed(2), "usd value": 1 * parseFloat(usdTokenAmount).toFixed(2) });
        tokenPortfolio.length > 0 ? console.table(tokenPortfolio) :
            console.log(chalk.hex('#DEADED').bold('No token data available for that token'));
    });
};

export const tokenRates = (tokens, currency) => {
    // if (token) { url += `${token}`;}

    // cryptocompare API base URL for token prices
    const BASE_URL = "https://min-api.cryptocompare.com/data/pricemulti?fsyms="
    const API_KEY = "4aa7b33d99d9d58782455f766ea79b2c3fce2d566167575c0bf726d319526f68";
    const RATES_URL = BASE_URL + tokens + `&tsyms=` + currency + `&api_key=` + API_KEY

    fetch(RATES_URL).then(async (response) => {
        const data = await response.json();
        console.log(JSON.stringify(data));
        return data;
    });
};

export const tokensPortfolio = (tokens, currency, portfolioBalance) => {
    // if (token) { url += `${token}`;}

    // cryptocompare API base URL for token prices
    const BASE_URL = "https://min-api.cryptocompare.com/data/pricemulti?fsyms="
    const API_KEY = "4aa7b33d99d9d58782455f766ea79b2c3fce2d566167575c0bf726d319526f68";
    const RATES_URL = BASE_URL + tokens + `&tsyms=` + currency + `&api_key=` + API_KEY

    fetch(RATES_URL).then(async (response) => {
        const data = await response.json();
        console.log(JSON.stringify(data));
        return data;
    });
};

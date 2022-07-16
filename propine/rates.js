import fetch from "node-fetch";

export default (token, currency) => {
    // if (token) { url += `${token}`;}

    // cryptocompare API base URL for token prices
    const BASE_URL = "https://min-api.cryptocompare.com/data/price?fsym="
    const API_KEY = "4aa7b33d99d9d58782455f766ea79b2c3fce2d566167575c0bf726d319526f68";
    const RATES_URL = BASE_URL + token + `&tsyms=` + currency + '&api_key=' + API_KEY

    fetch(RATES_URL).then(async (response) => {
        const data = await response.json();

        return console.log(JSON.stringify(data));
    });
};
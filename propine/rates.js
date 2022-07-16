import fetch from "node-fetch";

export default (token, currency) => {
    // if (token) { url += `${token}`;}

    // cryptocompare API base URL for token prices
    const base_url = "https://min-api.cryptocompare.com/data/price?fsym="

    const RATES_URL = base_url + token + `&tsyms=` + currency

    fetch(RATES_URL).then(async (response) => {
        const data = await response.json();

        return console.log(JSON.stringify(data));
    });
};

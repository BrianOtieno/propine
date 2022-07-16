import fetch from "node-fetch";

export default () => {
    const API_KEY = "4aa7b33d99d9d58782455f766ea79b2c3fce2d566167575c0bf726d319526f68";
    const url = `https://min-api.cryptocompare.com/data/blockchain/list` + `&api_key=` + API_KEY;

    fetch(url).then(async (response) => {
        const data = await response.json();
        return console.log(JSON.stringify(data));
    });
};

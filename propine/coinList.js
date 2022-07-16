import fetch from "node-fetch";

export default () => {
    const url = "https://min-api.cryptocompare.com/data/blockchain/list";

    fetch(url).then(async (response) => {
        const data = await response.json();
        return console.log(JSON.stringify(data));
    });
};

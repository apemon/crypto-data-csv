/*!
 * crypto-fetch
 * JavaScript library for fetch historical price data for cryptocurrencies
 * <https://github.com/apemon/promptpay-emv-parser>
 *
 * Refs:
 * - https://www.blognone.com/node/95133
 * 
 * @license MIT
 */

var marketMap = {
    BINANCE: "./market/binance.js",
    CRYPTOCOMPARE: "./market/cryptocompare.js"
}

function getDailyHistoricalPrice(params) {
    var promise = new Promise((resolve, reject) => {
        // validate input
        if(!params.market || !marketMap[params.market]) params.market = "CRYPTOCOMPARE";
        // market map
        var api = require(marketMap[params.market]);
        api.getDailyHistoricalPrice(params)
        .then(result => {
            return resolve(result);
        }).catch( err => {
            return reject(err);
        });
    });
    return promise;
}

module.exports = {
    getDailyHistoricalPrice: getDailyHistoricalPrice
}
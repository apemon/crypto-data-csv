/**
 * 
 */
var request = require('request-promise');
const url = require('url');

var rootPath = "https://api.binance.com";

function getDailyHistoricalPrice(params) {
    // get parameter
    var apiPath = "api/v1/klines";
    var requestUrl = url.resolve(rootPath, apiPath);
    // parameter mapping
    var apiParams = {
        symbol: params.fromsymbol + params.tosymbol,
        interval: '1d',
        startTime: params.startTime,
        endTime: params.endTime
    }
    var promise = new Promise((resolve, reject) => {
        request({ url: requestUrl, qs:apiParams })
        .then((res) => {
            return resolve(res);
        }).catch((err) => {
            return reject(err);
        });
    });
    return promise;
}

module.exports = {
    getDailyHistoricalPrice: getDailyHistoricalPrice
}

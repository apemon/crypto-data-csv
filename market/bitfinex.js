/**
 * the documentation is from https://bitfinex.readme.io/v2/reference
 */
const request = require('request-promise');
const url = require('url');

var rootPath = "https://api.bitfinex.com";

function getDailyHistoricalPrice(params) {
    // get parameter
    var apiPath = "v2/candles/";
    // construct request path
    var symbol = params.fromsymbol + params.tosymbol;
    apiPath += "trade:1D:t" + symbol + "/hist";
    var requestUrl = url.resolve(rootPath, apiPath);
    // parameter mapping
    var apiParams = {
        start: params.startTime,
        end: params.endTime,
        limit: 1000,
        sort: 1
    }
    var promise = new Promise((resolve, reject) => {
        request({ url: requestUrl, qs:apiParams })
        .then((res) => {
            var ticks = JSON.parse(res);
            if(ticks.length == 0) return reject("Invalid symbol.");
            return resolve(_GenerateCandlesResult(symbol, ticks));
        }).catch((err) => {
            return reject(err);
        });
    });
    return promise;
}

function _GenerateCandlesResult(symbol, ticks) {
    var datas = [];
    for(let tick of ticks) {
        data = {
            date: tick[0],
            open: tick[1],
            high: tick[3],
            low: tick[4],
            close: tick[2],
            volume: tick[5]
        }
        datas.push(data);
    }
    return result = {
        fromTime: datas[0].date,
        toTime: datas[datas.length - 1].date,
        market: "bitfinex",
        interval: '1d',
        symbol: symbol,
        datas: datas
    };
}

module.exports = {
    getDailyHistoricalPrice: getDailyHistoricalPrice
}

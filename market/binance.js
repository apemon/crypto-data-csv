/**
 * the documentation is from https://www.binance.com/restapipub.html
 */
const request = require('request-promise');
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
            return resolve(_GenerateKlineResult(apiParams.symbol, res));
        }).catch((err) => {
            var errorMsg = JSON.parse(err.response.body).msg;
            return reject(errorMsg);
        });
    });
    return promise;
}

function _GenerateKlineResult(symbol, res) {
    var datas = [];
    var ticks = JSON.parse(res);
    for(let tick of ticks) {
        data = {
            date: tick[0],
            open: tick[1],
            high: tick[2],
            low: tick[3],
            close: tick[4],
            volume: tick[5]
        }
        datas.push(data);
    }
    return result = {
        fromTime: datas[0].date,
        toTime: datas[datas.length - 1].date,
        market: "binance",
        interval: '1d',
        symbol: symbol,
        datas: datas
    };
}

module.exports = {
    getDailyHistoricalPrice: getDailyHistoricalPrice
}

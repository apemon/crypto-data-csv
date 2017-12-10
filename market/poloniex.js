/**
 * the documentation is from https://poloniex.com/support/api/
 */
const request = require('request-promise');
const url = require('url');
const moment = require('moment');

var rootPath = "https://poloniex.com";

function getDailyHistoricalPrice(params) {
    // get parameter
    var apiPath = "public";
    var requestUrl = url.resolve(rootPath, apiPath);
    // parameter mapping
    var symbol = params.fromsymbol + params.tosymbol;
    if(params.startTime == null) params.startTime = 0;
    if(params.endTime == null) params.endTime = moment.utc().startOf('d').toDate().getTime();
    var apiParams = {
        command: "returnChartData",
        currencyPair: params.tosymbol + "_" + params.fromsymbol,
        period: 86400,
        start: parseInt(params.startTime / 1000),
        end: parseInt(params.endTime / 1000)
    }
    var promise = new Promise((resolve, reject) => {
        request({ url: requestUrl, qs:apiParams })
        .then((res) => {
            return resolve(_GenerateChartDataResult(symbol, res));
        }).catch((err) => {
            return reject(err);
        });
    });
    return promise;
}

function _GenerateChartDataResult(symbol, res) {
    var datas = [];
    var ticks = JSON.parse(res);
    for(let tick of ticks) {
        data = {
            date: tick.date * 1000,
            open: tick.open,
            high: tick.high,
            low: tick.low,
            close: tick.close,
            volume: tick.volume
        }
        datas.push(data);
    }
    return result = {
        fromTime: datas[0].date,
        toTime: datas[datas.length - 1].date,
        market: "poloniex",
        interval: '1d',
        symbol: symbol,
        datas: datas
    };
}

module.exports = {
    getDailyHistoricalPrice: getDailyHistoricalPrice
}

/**
 * the documentation is from https://www.cryptocompare.com/api/
 */
const request = require('request-promise');
const moment = require('moment');
const url = require('url');

var rootPath = "https://min-api.cryptocompare.com/";

function getDailyHistoricalPrice(params) {
    // get parameter
    var apiPath = "data/histoday";
    var requestUrl = url.resolve(rootPath, apiPath);
    // parameter mapping
    var apiParams = {
        fsym: params.fromsymbol,
        tsym: params.tosymbol
    };
    var allData = false;
    var current = moment.utc().startOf('d').toDate().getTime();
    if(params.startTime == null && params.endTime == null) allData = true;
    else if(params.startTime == 0 && params.endTime == current) allData = true;
    else {
        if(params.startTime > current) return reject("start time cannot more than current time");
        if(params.startTime > params.endTime) return reject("start time cannot more than end time");
        var start = moment.utc(params.startTime);
        var end = moment.utc(params.endTime);
        var duration = moment.duration(end.diff(start));
        var limit = parseInt(duration.asDays());
        if(limit > 2000) allData = true;
        if(!allData) {
            apiParams["toTs"] = parseInt(end.toDate().getTime() / 1000);
            apiParams["limit"] = limit;
        }
    }
    apiParams["allData"] = allData;
    // call api
    var promise = new Promise((resolve, reject) => {
        request({ url: requestUrl, qs:apiParams })
        .then((res) => {
            return resolve(_GenerateDailyHistoricalResult(params, res));
        }).catch((err) => {
            return reject(err);
        });
    });
    return promise;
}

function _GenerateDailyHistoricalResult(params, res) {
    var datas = [];
    var ticks = JSON.parse(res).Data;
    for(let tick of ticks) {
        data = {
            date: tick.time * 1000,
            open: tick.open,
            high: tick.high,
            low: tick.low,
            close: tick.close,
            volume: tick.volumeto - tick.volumefrom
        }
        datas.push(data);
    }
    return result = {
        fromTime: datas[0].date,
        toTime: datas[datas.length - 1].date,
        market: "cryptocompare",
        interval: '1d',
        symbol: params.fromsymbol + params.tosymbol,
        datas: datas
    };
}

module.exports = {
    getDailyHistoricalPrice: getDailyHistoricalPrice
}

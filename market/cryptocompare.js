/**
 * the documentation is from https://www.cryptocompare.com/api/
 */
var request = require('request-promise');
const url = require('url');

var rootPath = "https://min-api.cryptocompare.com/";

function getDailyHistoricalPrice(params) {
    // get parameter
    var apiPath = "data/histoday";
    var apiParams = {
        fsym: params.fromsymbol,
        tsym: params.tosymbol,
    };
    var promise = new Promise((resolve, reject) => {
        reject("not implement");
    });
    return promise;
}

module.exports = {
    getDailyHistoricalPrice: getDailyHistoricalPrice
}

/**
 * template
 */
var request = require('request');

/**
 * 
 * @param {*} params including  
 */
function getDailyHistoricalPrice(params) {
    return {
        fromTime: 111111111,
        toTime: 111111111,
        market: "sample",
        interval: "1d",
        datas: [{
            date: 11111111,
            open: 0.001,
            high: 0.001,
            low: 0.001,
            close: 0.001,
            volume: 111111
        }]
    }
}

module.exports = {
    getDailyHistoricalPrice: getDailyHistoricalPrice
}

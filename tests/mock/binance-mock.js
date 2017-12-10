const fs = require('fs');
const nock = require('nock')

function PrepareDailyHistoricalPriceMock(apiParams) {
    // return query based on apiParams
    /*!
    * https://api.binance.com/api/v1/klines?symbol=QSPETH&interval=1d
    * created at 2017-12-10 02:48:01 GMT
    */
    var content = fs.readFileSync("./tests/mock/binance-klines-QSPETH.json", {encoding: "UTF8"});
    var jsonContent = JSON.parse(content);
    nock("https://api.binance.com")
    .get("/api/v1/klines")
    .query({symbol: "QSPETH", interval: "1d"})
    .reply(200, jsonContent);
    /*!
    * https://api.binance.com/api/v1/klines?symbol=QSPETH&interval=1d
    * data from 2017-11-01 to 2017-12-01
    * created at 2017-12-10 03:25:44 GMT
    */
    content = fs.readFileSync("./tests/mock/binance-klines-BTCUSDT.json", {encoding: "UTF8"});
    jsonContent = JSON.parse(content);
    nock("https://api.binance.com")
    .get("/api/v1/klines")
    .query({symbol: "BTCUSDT", interval: "1d", startTime:1509494400000, endTime: 1512086400000})
    .reply(200, jsonContent);
}

module.exports = {
    PrepareDailyHistoricalPriceMock: PrepareDailyHistoricalPriceMock
}
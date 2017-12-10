const fs = require('fs');
const nock = require('nock')

function PrepareDailyHistoricalPriceMock() {
    /*!
    * https://api.bitfinex.com/v2/candles/trade:1D:tOMGETH/hist?limit=1000&sort=1
    * created at 2017-12-10 12:28:50 GMT
    */
    var content = fs.readFileSync("./tests/mock/bitfinex-candles-OMGETH.json", {encoding: "UTF8"});
    var jsonContent = JSON.parse(content);
    nock("https://api.bitfinex.com")
    .get("/v2/candles/trade:1D:tOMGETH/hist")
    .query({
        limit: 1000,
        sort: 1
    })
    .reply(200, jsonContent);
    /*!
    * https://api.bitfinex.com/v2/candles/trade:1D:tBTCUSD/hist?limit=1000&end=1512086400000&start=1509494400000&sort=1
    * data from 2017-11-01 to 2017-12-01
    * created at 2017-12-10 12:32:30 GMT
    */
    content = fs.readFileSync("./tests/mock/bitfinex-candles-BTCUSD.json", {encoding: "UTF8"});
    jsonContent = JSON.parse(content);
    nock("https://api.bitfinex.com")
    .get("/v2/candles/trade:1D:tBTCUSD/hist")
    .query({
        limit: 1000,
        end: 1512086400000,
        start: 1509494400000,
        sort: 1
    })
    .reply(200, jsonContent);
}

module.exports = {
    PrepareDailyHistoricalPriceMock: PrepareDailyHistoricalPriceMock
}
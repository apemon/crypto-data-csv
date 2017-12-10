const fs = require('fs');
const nock = require('nock')

function PrepareDailyHistoricalPriceMock() {
    /*!
    * https://poloniex.com/public?command=returnChartData&currencyPair=ETH_OMG&start=0&period=86400
    * created at 2017-12-10 13:00:49 GMT
    */
    var content = fs.readFileSync("./tests/mock/poloniex-chart-ETHOMG.json", {encoding: "UTF8"});
    var jsonContent = JSON.parse(content);
    nock("https://poloniex.com")
    .get("/public")
    .query({
        command: "returnChartData",
        currencyPair: "ETH_OMG",
        start: 0,
        period: 86400,
        end: 1512864000
    })
    .reply(200, jsonContent);
    /*!
    * https://poloniex.com/public?command=returnChartData&currencyPair=USDT_BTC&period=86400&start=1509494400&end=1512086400
    * data from 2017-11-01 to 2017-12-01
    * created at 2017-12-10 13:00:49 GMT
    */
    content = fs.readFileSync("./tests/mock/poloniex-chart-USDTBTC.json", {encoding: "UTF8"});
    jsonContent = JSON.parse(content);
    nock("https://poloniex.com")
    .get("/public")
    .query({
        command: "returnChartData",
        currencyPair: "USDT_BTC",
        start: 1509494400,
        end: 1512086400,
        period: 86400
    })
    .reply(200, jsonContent);
}

module.exports = {
    PrepareDailyHistoricalPriceMock: PrepareDailyHistoricalPriceMock
}
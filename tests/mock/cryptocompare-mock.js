const fs = require('fs');
const nock = require('nock')

function PrepareDailyHistoricalPriceMock() {
    /*!
    * https://min-api.cryptocompare.com/data/histoday?fsym=BCC&tsym=BTC&allData=true
    * created at 2017-12-10 09:35:40 GMT
    */
    var content = fs.readFileSync("./tests/mock/cryptocompare-histoday-BCCBTC.json", {encoding: "UTF8"});
    var jsonContent = JSON.parse(content);
    nock("https://min-api.cryptocompare.com")
    .get("/data/histoday")
    .query({
        fsym: "BCC", 
        tsym: "BTC",
        allData: true
    })
    .reply(200, jsonContent);
    /*!
    * https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&allData=false&toTs=1512086400&limit=30
    * data from 2017-11-01 to 2017-12-01
    * created at 2017-12-10 08:58:45 GMT
    */
    content = fs.readFileSync("./tests/mock/cryptocompare-histoday-ETHUSD.json", {encoding: "UTF8"});
    jsonContent = JSON.parse(content);
    nock("https://min-api.cryptocompare.com")
    .get("/data/histoday")
    .query({
        fsym: "ETH", 
        tsym: "USD",
        toTs: 1512086400,
        limit: 30,
        allData: false
    })
    .reply(200, jsonContent);
}

module.exports = {
    PrepareDailyHistoricalPriceMock: PrepareDailyHistoricalPriceMock
}
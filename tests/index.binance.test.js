const assert = require('assert');
const cryptoFetch = require('./../index.js');
const binance = require('./mock/binance-mock.js')

before(function() {
    binance.PrepareDailyHistoricalPriceMock();
});

describe('test getDailyHistoricalPrice function',function() {
    it('test with minimize params', function(done) {
        var params = {
            fromsymbol: "QSP",
            tosymbol: "ETH",
            market: "BINANCE"
        };
        cryptoFetch.getDailyHistoricalPrice(params)
        .then(result => {
            assert.equal(result.market, "binance", "incorrect market");
            assert.equal(result.fromTime, 1511222400000, "mock error");
            assert.equal(result.toTime, 1512864000000, "mock error");
            assert.equal(result.datas.length, 20, "mock error");
            assert.equal(result.datas[0].open, 0.00030000, "incorrect open price");
            assert.equal(result.datas[18].close, 0.00025602, "incorrect close price");
            return done();
        }).catch(err => {
            console.log(err);
            return done(err);
        });  
    });

    it('test with startTime and endTime', function(done) {
        var params = {
            fromsymbol: "BTC",
            tosymbol: "USDT",
            market: "BINANCE",
            startTime: 1509494400000,
            endTime: 1512086400000
        };
        cryptoFetch.getDailyHistoricalPrice(params)
        .then(result => {
            assert.equal(result.market, "binance", "incorrect market");
            assert.equal(result.fromTime, 1509494400000, "mock error");
            assert.equal(result.toTime, 1512086400000, "mock error");
            assert.equal(result.datas.length, 31, "mock error");
            assert.equal(result.datas[0].open, 6463.00, "incorrect open price");
            assert.equal(result.datas[30].close, 10782.99, "incorrect close price");
            return done();
        }).catch(err => {
            console.log(err);
            return done(err);
        });  
    });
});
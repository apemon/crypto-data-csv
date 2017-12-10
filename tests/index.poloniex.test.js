const assert = require('assert');
const cryptoFetch = require('./../index.js');
const poloniex = require('./mock/poloniex-mock.js')

before(function() {
    poloniex.PrepareDailyHistoricalPriceMock();
});

describe('poloniex exchange', function() {
    describe('test getDailyHistoricalPrice function',function() {
        it('test with minimal params', function(done) {
            var params = {
                fromsymbol: "OMG",
                tosymbol: "ETH",
                market: "POLONIEX"
            };
            cryptoFetch.getDailyHistoricalPrice(params)
            .then(result => {
                assert.equal(result.market, "poloniex", "incorrect market");
                assert.equal(result.fromTime, 1505174400000, "incorrect from time");
                assert.equal(result.toTime, 1512864000000, "incorrect to time");
                assert.equal(result.datas.length, 90, "incorrect data");
                assert.equal(result.datas[0].open, 0.048, "incorrect open price");
                assert.equal(result.datas[88].close, 0.01831225, "incorrect close price");
                return done();
            }).catch(err => {
                return done(err);
            });  
        });
    
        it('test with startTime and endTime', function(done) {
            var params = {
                fromsymbol: "BTC",
                tosymbol: "USDT",
                market: "POLONIEX",
                startTime: 1509494400000,
                endTime: 1512086400000
            };
            cryptoFetch.getDailyHistoricalPrice(params)
            .then(result => {
                assert.equal(result.market, "poloniex", "incorrect market");
                assert.equal(result.fromTime, 1509494400000, "mock error");
                assert.equal(result.toTime, 1512086400000, "mock error");
                assert.equal(result.datas.length, 31, "mock error");
                assert.equal(result.datas[0].open, 6455, "incorrect open price");
                assert.equal(result.datas[30].close, 10699.888888, "incorrect close price");
                return done();
            }).catch(err => {
                return done(err);
            });  
        });
    });
});

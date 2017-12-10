const assert = require('assert');
const cryptoFetch = require('./../index.js');
const bitfinex = require('./mock/bitfinex-mock.js')

before(function() {
    bitfinex.PrepareDailyHistoricalPriceMock();
});

describe('bitfinex exchange', function() {
    describe('test getDailyHistoricalPrice function',function() {
        it('test with minimal params', function(done) {
            var params = {
                fromsymbol: "OMG",
                tosymbol: "ETH",
                market: "BITFINEX"
            };
            cryptoFetch.getDailyHistoricalPrice(params)
            .then(result => {
                assert.equal(result.market, "bitfinex", "incorrect market");
                assert.equal(result.fromTime, 1499990400000, "incorrect from time");
                assert.equal(result.toTime, 1512864000000, "incorrect to time");
                assert.equal(result.datas.length, 150, "incorrect data");
                assert.equal(result.datas[0].open, 0.004, "incorrect open price");
                assert.equal(result.datas[148].close, 0.018216, "incorrect close price");
                return done();
            }).catch(err => {
                return done(err);
            });  
        });
    
        it('test with startTime and endTime', function(done) {
            var params = {
                fromsymbol: "BTC",
                tosymbol: "USD",
                market: "BITFINEX",
                startTime: 1509494400000,
                endTime: 1512086400000
            };
            cryptoFetch.getDailyHistoricalPrice(params)
            .then(result => {
                assert.equal(result.market, "bitfinex", "incorrect market");
                assert.equal(result.fromTime, 1509494400000, "mock error");
                assert.equal(result.toTime, 1512086400000, "mock error");
                assert.equal(result.datas.length, 31, "mock error");
                assert.equal(result.datas[0].open, 6455, "incorrect open price");
                assert.equal(result.datas[30].close, 10860, "incorrect close price");
                return done();
            }).catch(err => {
                return done(err);
            });  
        });
    });
});

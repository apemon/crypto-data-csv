const assert = require('assert');
const cryptoFetch = require('./../index.js');
const cryptocompare = require('./mock/cryptocompare-mock.js')

before(function() {
    cryptocompare.PrepareDailyHistoricalPriceMock();
});

describe('cryptocompare', function(){
    describe('test getDailyHistoricalPrice function',function() {
        it('test with minimize params', function(done) {
            var params = {
                fromsymbol: "BCC",
                tosymbol: "BTC",
                market: "CRYPTOCOMPARE"
            };
            cryptoFetch.getDailyHistoricalPrice(params)
            .then(result => {
                assert.equal(result.market, "cryptocompare", "incorrect market");
                assert.equal(result.fromTime, 1489795200000, "invalid from time");
                assert.equal(result.toTime, 1512864000000, "invalid to time");
                assert.equal(result.datas.length, 268, "mock error");
                assert.equal(result.datas[0].open, 1.2, "incorrect open price");
                assert.equal(result.datas[266].close, 0.9999, "incorrect close price");
                return done();
            }).catch(err => {
                return done(err);
            });  
        });
    
        it('test with startTime and endTime', function(done) {
            var params = {
                fromsymbol: "ETH",
                tosymbol: "USD",
                market: "CRYPTOCOMPARE",
                startTime: 1509494400000,
                endTime: 1512086400000
            };
            cryptoFetch.getDailyHistoricalPrice(params)
            .then(result => {
                assert.equal(result.market, "cryptocompare", "incorrect market");
                assert.equal(result.fromTime, 1509494400000, "mock error");
                assert.equal(result.toTime, 1512086400000, "mock error");
                assert.equal(result.datas.length, 31, "mock error");
                assert.equal(result.datas[0].open, 303.63, "incorrect open price");
                assert.equal(result.datas[30].close, 461.58, "incorrect close price");
                return done();
            }).catch(err => {
                return done(err);
            });  
        });
    });
});

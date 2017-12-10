const assert = require('assert');
const cryptoFetch = require('./../index.js');
const nock = require('nock');


describe('test parse function',function() {
    it('it should pass', function(done) {
        nock("https://api.binance.com/api/v1/klines")
        .get("")
        .query({symbol: 'BTCUSDT123', interval:"1d"})
        .reply(200, 
            '[[1502928000000,"4261.48000000","4485.39000000","4200.74000000","4285.08000000","795.15037700",1503014399999,"3454770.05073206",3427,"616.24854100","2678216.40060401","8733.91139481"]]'
        );

        var params = {
            fromsymbol: "BTC",
            tosymbol: "USDT123",
            market: "BINANCE"
        };
        cryptoFetch.getDailyHistoricalPrice(params)
        .then(results => {
            return done();
        }).catch(err => {
            console.log(err);
            return done(err);
        });  
    });
});
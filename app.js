// common service
var Q = require('q');
var moment = require('moment');
var os = require('os');

// express app
var express = require('express')
var port = process.env.PORT||3000;
var app = express();

// cryptocompare api
global.fetch = require('node-fetch');
var cryptocompare = require('cryptocompare');

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.get('/price/:symbol', function(req, res){
  var symbol = req.params.symbol.toUpperCase();
  getHistoricalData(symbol)
  .then(datas => {
    var ticket = symbol + "USD";
    var result = "";
    for(i = 0;i < datas.length; i++){ 
      var data = datas[i];
      var date = moment(data.time * 1000).format("YYYY-MM-DD");
      result += ticket + "," + date + "," + data.open + "," + data.high + "," + data.low + "," + data.close + "<br>";
    }
    res.send(result);
  }).catch(error => {
    res.send(error);
  });
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port)
});

function getHistoricalData(symbol) {
  var deferred = Q.defer();
  cryptocompare.histoDay(symbol,'USD',{limit:'none'})
    .then(datas => {
      deferred.resolve(datas);
    }).catch(error => {
      deferred.reject(error);
    });
  return deferred.promise;
}
var fs = require('fs');
var argv = require('argv');
var os = require('os');
var Q = require('q');
var moment = require('moment');
// cryptocompare api
global.fetch = require('node-fetch');
var cryptocompare = require('cryptocompare');
var binance = require('./market/binance.js');

// prase param
var args = argv.option([
    {
        name: "fromsymbol",
        type: "string",
        short: "f"
    },{
        name: "tosymbol",
        type: "string",
        short: "t"
    },{
        name: "start",
        type: "string",
        short: "s"
    },{
        name: "end",
        type: "string",
        short: "e"
    },{
        name: "market",
        type: "string",
        short: "m"
    }
]).run();

// string replace all
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

// initial parameter
var fromsymbol = args.options.fromsymbol.toUpperCase();
var tosymbol = args.options.tosymbol.toUpperCase();
var start = args.options.start;
var startTimestamp = 0;
if(start != null) startTimestamp = moment.utc(start).toDate().getTime();
var params = {
    fromsymbol: fromsymbol,
    tosymbol: tosymbol,
    startTime: startTimestamp
};

// get historical data
/*
getHistoricalData(fromsymbol, tosymbol)
.then(datas => {
  var ticket = fromsymbol + tosymbol;
  var result = "";
  for(i = 0;i < datas.length; i++){ 
    var data = datas[i];
    var dateTimestamp = moment(data.time * 1000);
    if(dateTimestamp < startTimestamp) continue; 
    var date = dateTimestamp.format("YYYY-MM-DD");
    result += ticket + "," + date + "," + data.open + "," + data.high + "," + data.low + "," + data.close + os.EOL;
  }
  // write file content
  fs.writeFileSync(ticket + ".txt",result);
}).catch(error => {
    fs.writeFileSync(ticket + "-error.txt",error);
});
*/

binance.getDailyHistoricalPrice(params)
.then(datas => {
    console.log(datas);
})
.catch(err => {
    console.log(err);
});

function getHistoricalData(fromsymbol, tosymbol, options) {
    var deferred = Q.defer();
    cryptocompare.histoDay(fromsymbol,tosymbol,{limit:'none', allData:false})
      .then(datas => {
        deferred.resolve(datas);
      }).catch(error => {
        deferred.reject(error);
      });
    return deferred.promise;
  }
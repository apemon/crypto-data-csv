var fs = require('fs');
var argv = require('argv');
var os = require('os');
var Q = require('q');
var moment = require('moment');
// cryptocompare api
global.fetch = require('node-fetch');
var cryptocompare = require('cryptocompare');

// prase param
var args = argv.option([
    {
        name: "fromsymbol",
        type: "string"
    },{
        name: "tosymbol",
        type: "string"
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

// get historical data
getHistoricalData(fromsymbol, tosymbol)
.then(datas => {
  var ticket = fromsymbol + tosymbol;
  var result = "";
  for(i = 0;i < datas.length; i++){ 
    var data = datas[i];
    var date = moment(data.time * 1000).format("YYYY-MM-DD");
    result += ticket + "," + date + "," + data.open + "," + data.high + "," + data.low + "," + data.close + os.EOL;
  }
  // write file content
  fs.writeFileSync(ticket + ".txt",result);
}).catch(error => {
    fs.writeFileSync(ticket + "-error.txt",error);
});

function getHistoricalData(fromsymbol, tosymbol) {
    var deferred = Q.defer();
    cryptocompare.histoDay(fromsymbol,tosymbol,{limit:'none'})
      .then(datas => {
        deferred.resolve(datas);
      }).catch(error => {
        deferred.reject(error);
      });
    return deferred.promise;
  }
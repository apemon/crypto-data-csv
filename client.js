var Q = require('q');
var os = require('os');
var fs = require('fs');
var argv = require('argv');
var request = require('request');

// prase param
var args = argv.option([
    {
        name: "url",
        type: "string"
    },{
        name: "symbol",
        type: "string"
    }
]).run();

// initial parameter
var path = args.options.url;
var symbol = args.options.symbol;
symbol = symbol.toUpperCase();

// string replace all
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

// call ws
request.get("http://crypto-data-fetcher.azurewebsites.net/price/" + symbol, function(err, res, body){
    // write file
    var content = body.replaceAll("<br>",os.EOL);
    fs.writeFileSync(symbol + "USD.txt",content);
});
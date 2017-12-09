# crypto-fetch [![npm version](https://badge.fury.io/js/crypto-fetch.svg)](https://badge.fury.io/js/crypto-fetch)

[command line app](#cli) and [JavaScript library](#api) to retrieve crypto-currency daily market data. Currently, it support [CryptoCompare](https://www.cryptocompare.com/) and [Binance](https://www.binance.com/) websites. 

This repository:
- [**Command-line application**](#cli) - Get daily crypto-currency market data via command line.
- [**JavaScript API**](#api) - Get daily crypto-currency api via programmatically.

## CLI

Install Node.js and run this command to install 'crypto-fetch'

```
npm install -g crypto-fetch
```

## Usage

To get daily price data of BitCoin compare with USD dollar, simply enter
```
crypto-fetch -f BTC -t USD
```
You will get information with these following format
```
symbol, time, open, high, low, close, volume
```

## Options

|Parameter|Required|Default|Description|
|---------|--------|-------|-----------|
| --fromsymbol, -f | true |  | source symbol |
| --tosymbol, -t | true |  | counter party symbol|
| --start, -s | false|  | start time in YYYY-MM-DD format (ex. 2017-12-01). If not specify, it will get all available information |
| --end, -e | false |  | end time in YYYY-MM-DD format (ex. 2017-12-01). If not specify, it will be current date
| --market, -m | false | cryptocompare | exchange market data source. now support 2 exchanges, which are cryptocompare and binance.|
| --output, -o | false |  | output path. If not specify, it will print through console.

For example, you want to get ETH price in USD dollor from binance exchange. you can get with these command
```
crypto-fetch -f BTC -t USDT -m binance
``` 

## API

You can get this library from npm
```
npm install crypto-fetch
```

```
getDailyHistoricalPrice(params)
```
Return daily historical price information (promise)


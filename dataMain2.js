import { alpaca } from './alpaca.js'
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const talib = require('talib');
// const SMA = require('technicalindicators').SMA;



  let clam = {
    'AAPL': [
      {
        timestamp: 1677446400000, // Represents '2023-03-29' in Unix milliseconds.
        open: 145.0,
        high: 147.8,
        low: 144.5,
        close: 147.2,
        volume: 98340128,
        trade_count: 658314,
        vwap: 146.39,  // Volume Weighted Average Price
        adj_open: 144.0,
        adj_high: 146.8,
        adj_low: 143.5,
        adj_close: 146.2,
        adj_volume: 98340128
      },
      {
        timestamp: 1677532800000, // Represents '2023-03-30' in Unix milliseconds.
        open: 147.5,
        high: 150.0,
        low: 146.8,
        close: 149.3,
        volume: 102478935,
        trade_count: 712509,
        vwap: 148.67,
        adj_open: 146.5,
        adj_high: 149.0,
        adj_low: 145.8,
        adj_close: 148.3,
        adj_volume: 102478935
      }
      // ... more data points ...
    ]
  }



  function priceBreakoutStrategy(data, n = 14) {
    const highPrices = data.map(item => item.adj_high);
    const lowPrices = data.map(item => item.adj_low);
    const closePrices = data.map(item => item.adj_close);

    let signals = [];
    for (let i = n; i < closePrices.length; i++) {
        let highestPastNDays = Math.max(...highPrices.slice(i - n, i));
        let lowestPastNDays = Math.min(...lowPrices.slice(i - n, i));

        if (closePrices[i] > highestPastNDays) {
            signals.push('BUY');
        } else if (closePrices[i] < lowestPastNDays) {
            signals.push('SELL');
        } else {
            signals.push('HOLD');
        }
    }
    console.log(signals)
    return signals;
}


// priceBreakoutStrategy(clam['AAPL'], 14)


let marketData = {
  open : [
    126.99,127.10,127.11,126.93,126.98,126.99,126.82,126.95,127.05,127.05,127.08,127.20,127.25,127.17,127.25
  ],
  high : [
    127.36,127.31,127.21,127.15,127.08,127.19,127.09,127.08,127.18,127.16,127.31,127.35,127.34,127.29,127.36
  ],
  low : [
    126.99,127.10,127.11,126.93,126.98,126.99,126.82,126.95,127.05,127.05,127.08,127.20,127.25,127.17,127.25
  ],
  close : [
    127.28,127.11,127.15,127.04,126.98,127.07,126.93,127.05,127.11,127.15,127.30,127.28,127.28,127.29,127.25
  ],
  volume : [
    89329,16137,23945,20679,27252,20915,17372,17600,13896,6700,13848,9925,5540,10803,19400
  ],
};





let output = talib.explain('SMA', marketData)
let arr1 = []
let obj = {
  'SMA': 9,
  'RSI': 8,
  'STOCH': 7,
  'MACD': 7,
  'AROON': 7,
  'OBV': 'U'
}
let arr3 = []
// let out = output.forEach((item) => {

//   if (obj[item.name]) arr1.push(item)

// })


// console.log(arr1)

// SMA
// RSI
// STOCH
// MACD
// AROON
// OBV
//

[
  'version',
  'functions',
  'functionUnstIds',
  'explain',
  'execute',
  'setUnstablePeriod'
]

console.log(output)
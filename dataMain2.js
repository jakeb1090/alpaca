import { alpaca } from './alpaca.js'
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const talib = require('talib');


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


priceBreakoutStrategy(clam['AAPL'], 14)
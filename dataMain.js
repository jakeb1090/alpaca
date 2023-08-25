import { alpaca } from './alpaca.js'

function computeEMA(prices, period, prevEMA) {
  const k = 2 / (period + 1);
  return prices.map((price, index) => {
    if (index === 0) return prevEMA ? (prevEMA + k * (price - prevEMA)) : price;
    return (1 - k) * prices[index - 1] + k * price;
  });
}


function computeMACD(data) {
  const prices = data.map(entry => entry.close);

  const shortEMA = computeEMA(prices, 12);
  const longEMA = computeEMA(prices, 26);

  const macdLine = shortEMA.map((price, index) => price - longEMA[index]);
  const signalLine = computeEMA(macdLine, 9);

  return { macdLine, signalLine };
}


const clam = {
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
const result = computeMACD(clam['AAPL']);
console.log(result);
import { marketData } from '../marketData.js';

let period = 5


function calculateSMA(data, period) {
  return data.slice(-period).reduce((sum, value) => sum + value, 0) / period;
}

function calculateEMA(data, period) {
  const weights = Array.from({ length: period }, (_, i) => Math.exp(-i / period));
  const ema = [];
  for (let i = period - 1; i < data.length; i++) {
      const emaValue = data.slice(i - period + 1, i + 1)
          .reduce((sum, value, idx) => sum + value * weights[idx], 0);
      ema.push(emaValue);
  }
  return ema[ema.length - 1];
}

function calculateRSI(data, period) {
  const changes = data.slice(1).map((value, i) => value - data[i]);
  const gain = changes.map(change => change > 0 ? change : 0);
  const loss = changes.map(change => change < 0 ? -change : 0);

  const avgGain = gain.slice(-period).reduce((sum, value) => sum + value, 0) / period;
  const avgLoss = loss.slice(-period).reduce((sum, value) => sum + value, 0) / period;

  const rs = avgGain / avgLoss;
  const rsi = 100 - (100 / (1 + rs));
  return rsi;
}


const data = marketData;
const shortPeriod = 12; // Short-term EMA period
const longPeriod = 26; // Long-term EMA period
const signalPeriod = 9; // Signal line EMA period

function calculateMACD(data, shortPeriod, longPeriod, signalPeriod) {
  function calculateEMA(data, period) {
    const multiplier = 2 / (period + 1);
    let ema = data.slice(0, period).reduce((sum, value) => sum + value.ClosePrice, 0) / period;

    for (let i = period; i < data.length; i++) {
      ema = (data[i].ClosePrice - ema) * multiplier + ema;
    }

    return ema;
  }

  const shortEMA = calculateEMA(data, shortPeriod);
  const longEMA = calculateEMA(data, longPeriod);
  const macd = shortEMA - longEMA;

  const signalLine = calculateEMA([{ ClosePrice: macd }], signalPeriod);

  const histogram = macd - signalLine;

  return { macd: macd, signalLine: signalLine, histogram: histogram };
}




// Implement the other indicator calculation functions similarly

function calculateFinalScore(indicatorResults) {
  // Calculate the final score based on the results of all indicators
  // Normalize the scores between 1 and 100
  const normalizedScores = {};

  for (const indicator in indicatorResults) {
      normalizedScores[indicator] = (indicatorResults[indicator] - 1) / 99; // Normalize to [0, 1]
  }

  const weights = {
      sma: 0.2,
      ema: 0.15,
      rsi: 0.1,
      // Add weights for other indicators
  };

  let totalScore = 0;
  for (const indicator in normalizedScores) {
      totalScore += normalizedScores[indicator] * (weights[indicator] || 0);
  }

  return Math.min(100, Math.max(1, totalScore * 100)); // Ensure the score is between 1 and 100
}

// Calculate indicator results
const indicatorResults = {
  sma: calculateSMA(marketData.close, period),
  ema: calculateEMA(marketData.close, period),
  rsi: calculateRSI(marketData.close, period),
  macd: calculateMACD(marketData, shortPeriod, longPeriod, signalPeriod),
  // Calculate other indicator results
};

// Calculate the final score
// const finalScore = calculateFinalScore(indicatorResults);

// if (finalScore > 80) {
//   console.log("Profitable buy order!", finalScore);
// } else {
//   console.log("Not a profitable buy order.", finalScore);
// }

// console.log(indicatorResults)






const result = calculateMACD(data, shortPeriod, longPeriod, signalPeriod);

console.log(`MACD: ${result.macd}`);
console.log(`Signal Line: ${result.signalLine}`);
console.log(`Histogram: ${result.histogram}`);
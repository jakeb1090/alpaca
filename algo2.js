import { createRequire } from "module";
import { marketData } from './marketData.js'; // Your market data array
import { output } from './output.js'; // Your market data array
const require = createRequire(import.meta.url);
const talib = require('talib');



console.log(marketData)

function calculateIndicators(data) {
  const closingPrices = data.map(entry => entry.ClosePrice)

  // Calculate moving average
  const maPeriod = 5; // Adjust the period based on your strategy
  const movingAverage = calculateMovingAverage(closingPrices, maPeriod);

  // Calculate RSI
  const rsiPeriod = 14; // Adjust the period based on your strategy
  const rsiValues = calculateRSI(closingPrices, rsiPeriod);

  // Calculate EMA
  const lookbackPeriod = 10; // Adjust as needed
  const timeframe = '30min'; // Adjust as needed
  const emaValues = calculateEMA(marketData, lookbackPeriod, timeframe);

  return { movingAverage, rsiValues, emaValues };
}

function estimateNextDayPrice(data) {
  const indicators = calculateIndicators(data);

  const lastClosingPrice = data[data.length - 1].ClosePrice;
  const nextDayOpeningPrice = indicators.movingAverage[indicators.movingAverage.length - 1];

  // Calculate confidence score based on RSI value
  const rsiValue = indicators.rsiValues[indicators.rsiValues.length - 1];
  const confidenceScore = Math.min(100, Math.max(0, 100 - rsiValue)); // Normalize to 1-100 range

  return { nextDayOpeningPrice, confidenceScore };
}

// Calculate moving average using TA-Lib
function calculateMovingAverage(prices, period) {
  return talib.execute({
    name: 'SMA',
    startIdx: 0,
    endIdx: prices.length - 1,
    inReal: prices,
    optInTimePeriod: period,
  }).result.outReal;
}

// Calculate RSI using TA-Lib
function calculateRSI(prices, period) {
  return talib.execute({
    name: 'RSI',
    startIdx: 0,
    endIdx: prices.length - 1,
    inReal: prices,
    optInTimePeriod: period,
  }).result.outReal;
}


function calculateEMA(data, lookbackPeriod, timeframe) {
  const emaValues = [];
  const smoothingFactor = 2 / (lookbackPeriod + 1);

  for (let i = lookbackPeriod - 1; i < data.length; i++) {
    let sum = 0;

    for (let j = i - lookbackPeriod + 1; j <= i; j++) {
      sum += data[j].ClosePrice;
    }

    const initialSMA = sum / lookbackPeriod;
    const ema = [];

    for (let j = i - lookbackPeriod + 1; j <= i; j++) {
      if (j === i - lookbackPeriod + 1) {
        ema[j] = initialSMA;
      } else {
        ema[j] = (data[j].ClosePrice - ema[j - 1]) * smoothingFactor + ema[j - 1];
      }
    }
    emaValues.push(ema[i]);
  }
  return emaValues;
}



// Calculate and display the estimate
const getNextDayPrice = (data) => {
  const estimate = estimateNextDayPrice(output);
  console.log(`Estimated next trading day's opening price: $${estimate.nextDayOpeningPrice.toFixed(2)}`);
  console.log(`Confidence level: ${estimate.confidenceScore}`)
}

export { getNextDayPrice }
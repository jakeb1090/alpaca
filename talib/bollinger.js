import { RSIcheck } from "../getData.js";

function calculateBollingerBandsAndProfitability(priceData, periods, stdDeviations) {
  const smaValues = [];
  const upperBands = [];
  const lowerBands = [];
  const profitabilityScores = [];

  for (let i = periods - 1; i < priceData.length; i++) {
    const sma = priceData
      .slice(i - periods + 1, i + 1)
      .reduce((sum, price) => sum + price, 0) / periods;
    smaValues.push(sma);

    const stdDev = Math.sqrt(
      priceData
        .slice(i - periods + 1, i + 1)
        .reduce((sum, price) => sum + Math.pow(price - sma, 2), 0) / periods
    );

    const upperBand = sma + stdDeviations * stdDev;
    const lowerBand = sma - stdDeviations * stdDev;
    upperBands.push(upperBand);
    lowerBands.push(lowerBand);

    const currentPrice = priceData[i];
    const profitabilityScore =
      currentPrice >= upperBand
        ? 100
        : currentPrice <= lowerBand
        ? 0
        : ((currentPrice - lowerBand) / (upperBand - lowerBand)) * 100;
    profitabilityScores.push(profitabilityScore);
  }

  return {
    sma: smaValues,
    upperBands,
    lowerBands,
    profitabilityScores,
  };
}



let periods = 11; // Number of periods for the moving average
let stdDeviations = 2; // Number of standard deviations for the bands

let marketData = RSIcheck('AAPL')

let result = calculateBollingerBandsAndProfitability(
  marketData.close,
  periods,
  stdDeviations
);

console.log("SMA Values:", result.sma);
console.log("Upper Bollinger Bands:", result.upperBands);
console.log("Lower Bollinger Bands:", result.lowerBands);
console.log("Profitability Scores:", result.profitabilityScores);






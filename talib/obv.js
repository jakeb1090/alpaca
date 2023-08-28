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


function calculateOBV(marketData) {
  const { close, volume } = marketData;
  const obvValues = [0]; // Start with an initial OBV value of 0

  for (let i = 1; i < close.length; i++) {
    if (close[i] > close[i - 1]) {
      obvValues.push(obvValues[i - 1] + volume[i]); // If the price went up, add volume
    } else if (close[i] < close[i - 1]) {
      obvValues.push(obvValues[i - 1] - volume[i]); // If the price went down, subtract volume
    } else {
      obvValues.push(obvValues[i - 1]); // If the price is unchanged, OBV remains the same
    }
  }

  return obvValues;
}

function calculateProfitabilityScore(obvValues) {
  const score = (obvValues[obvValues.length - 1] / obvValues[obvValues.length - 2]) * 100;
  console.log('score', score)
  return Math.min(Math.max(score, 0), 100); // Ensure the score is between 0 and 100
}

// Example market data object

// Calculate OBV values
const obvValues = calculateOBV(marketData);

// Calculate profitability score based on OBV values
const profitabilityScore = calculateProfitabilityScore(obvValues);

console.log("OBV Values:", obvValues);
console.log("Profitability Score:", profitabilityScore);

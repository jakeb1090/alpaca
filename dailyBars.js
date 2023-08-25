import { alpaca } from './alpaca.js'
import { testCompletion } from './openai/testCompletion.js'
import Websocket from 'ws'
import 'dotenv/config'
import fs from 'fs'

const { API_KEY, API_SECRET } = process.env

const RSIcheck = async (symbol) => {

  const bars = alpaca.getBarsV2(symbol, {
    start: "2023-08-01",
    end: "2023-08-22",
    timeframe: alpaca.newTimeframe(30, alpaca.timeframeUnit.MIN),
    limit: 1000,
  });

    const got = [];
    for await (let b of bars) {
      got.push(b.ClosePrice);
    }


    function computeRSI(closingPrices) {
      const length = closingPrices.length;
      let gain = 0;
      let loss = 0;

      for (let i = 1; i < length; i++) {
        const diff = closingPrices[i] - closingPrices[i - 1];
        if (diff > 0) gain += diff;
        else loss -= diff;  // losses are positive values
      }

      const avgGain = gain / length;
      const avgLoss = loss / length;

      let rsi = 100 - (100 / (1 + (avgGain / avgLoss)))
      console.log(rsi)
      return rsi
    }

    await computeRSI(got)

}
// RSIcheck('AAPL')

// console.log(got);
// console.log(computeRSI(got))
export { RSIcheck }
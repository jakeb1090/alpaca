import { alpaca } from "./alpaca.js"
import moment from 'moment'
import * as fs from 'fs';

const RSIcheck = async (symbol) => {
  let currentTime = moment().subtract(0, 'days').format('YYYY-MM-DDTHH:mm:ss.SSSZ')
  let sTime = moment(currentTime).subtract(15, 'days').toISOString()
  let eTime = moment(currentTime).subtract(15, 'minutes').toISOString()

  let config = {
    start: sTime,
    end: eTime,
    timeframe: alpaca.newTimeframe(16, alpaca.timeframeUnit.MIN),
    limit: 16
  }

  const bars = alpaca.getBarsV2([symbol], config)

  console.log('bars: ', bars)

  const got = [];
  fs.writeFileSync('output.js', 'let output = [');
  for await (let b of bars) {
    got.push(b);
    fs.appendFileSync('output.js', JSON.stringify(b) + ',\n');
  }
  fs.appendFileSync('output.js', '] \n');
  fs.appendFileSync('output.js', '\n\n export { output }');


  console.log('got: ', got)
  return got

}

RSIcheck('axp')

export { RSIcheck }


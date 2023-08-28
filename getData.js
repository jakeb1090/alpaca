import { alpaca } from "./alpaca.js"
import moment from 'moment'

const RSIcheck = async (symbol) => {
  let currentTime = moment().subtract(0, 'days').format('YYYY-MM-DDTHH:mm:ss.SSSZ')
  let sTime = moment(currentTime).subtract(120, 'minutes').toISOString()
  let eTime = moment(currentTime).subtract(15, 'minutes').toISOString()

  let config = {
    start: sTime,
    end: eTime,
    timeframe: alpaca.newTimeframe(1, alpaca.timeframeUnit.MIN),
    limit: 200,

  }

  const bars = alpaca.getBarsV2(['AAPL'], config)

  console.log('bars: ', bars)
  const got = [];
  for await (let b of bars) {
    got.push(b);
  }

  console.log('got: ', got)
  return got

}

RSIcheck('VFS')

export { RSIcheck }


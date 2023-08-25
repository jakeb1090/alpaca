import { alpaca } from './alpaca.js'
import { gpt } from './gpt.js'
import { executeTrade } from './trade.js'
import Websocket from 'ws'
import 'dotenv/config'

const { API_KEY, API_SECRET } = process.env
const stream = 'wss://stream.data.alpaca.markets/v1beta1/news'

const wss = new Websocket(stream)

// 1. Setup Stream
wss.on('open', async () => {
  const authReq = {
    action: 'auth',
    key: API_KEY,
    secret: API_SECRET,
  }
  await wss.send(JSON.stringify(authReq)) // #1 authenticate

  const subscribeReq = {
    action: 'subscribe',
    news: ['*'],
  }
  await wss.send(JSON.stringify(subscribeReq)) // #2 subscribe
})


// 2. Receive
wss.on('message', async (data) => {
  //parse data and return headline and comany
  let obj = JSON.parse(data)
  if (obj.T !== 'n') console.log('obj: ', obj[0])

  if (obj[0].T === 'n') {
    let { headline, symbols, T } = obj[0]
    let rating = await testCompletion(headline, symbols[0])
    console.log('vals: ', { headline, symbols, T, rating })

    if (rating > 80) {
      //buy stock
      const buyReq = {
        action: 'buy',
        symbol: symbols[0],
        qty: 50,
        type: 'market',
        time_in_force: 'day',
      }
      await executeTrade(symbols[0])
    }
  }
})

export default { wss }

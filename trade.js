import { alpaca} from "./alpaca.js";


const buyReq = {
  symbol: 'AAPL',
  qty: 1,
  side: 'buy',
  type: 'market',
  time_in_force: 'day'
}

const sellReq = {
  symbol: 'AAPL',
  qty: 1,
  side: 'sell',
  type: 'market',
  time_in_force: 'day'
}


const executeTrade = async (sym) => {

  const buyReq = {
    symbol: sym,
    qty: 1,
    side: 'buy',
    type: 'market',
    time_in_force: 'day'
  }

  await alpaca.createOrder(buyReq)
  .then((res) => {
    console.log({
      status: res.status,
      qty: res.qty,
      symbol: sym,
    })
  }).then(() => alpaca.getOrders(orderReq).
    then((res) => console.log('Open orders: ', res.length)))

}

let orderReq = {
    status: 'open',
    after: new Date('2021-01-01'),
    until: new Date(Date.now()),
    limit: 20,
    direction: 'asc'
}

export { executeTrade, orderReq }
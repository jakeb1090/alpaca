
import { alpaca } from './alpaca.js'

const apFunctions = {

  getAccount: async () => {
    let account = await alpaca.getAccount()
    return account
  },

  getAccountConfigurations: async () => {
    let accountConfigurations = await alpaca.getAccountConfigurations()
    return accountConfigurations
  },

  getPortfolioHistory: async (dateStart, dateEnd, period, timeframe) => {
    let portfolioHistory = await alpaca.getPortfolioHistory({
      date_start: dateStart,        //Date
      date_end: dateEnd,            //Date
      period: period,               //'1M' | '3M' | '6M' | '1A' | 'all' | 'intraday'
      timeframe: timeframe,         //'1Min' | '5Min' | '15Min' | '1H' | '1D'
      extended_hours: false         //Boolean
    })
    return portfolioHistory
  }


}

// apFunctions.getPortfolioHistory(new Date(Date.now()), new Date(Date.now() - 90), 'intraday', '1Min')
//   .then(res => console.log(res))

apFunctions.getAccount().then(res => console.log(res))

export { apFunctions }
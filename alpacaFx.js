
import { alpaca } from './alpaca.js'

const fx = {
  getAccount: async () => {
    let account = await alpaca.getAccount()
    return account
  },

  getAccountConfigurations: async () => {
    let accountConfigurations = await alpaca.getAccountConfigurations()
    return accountConfigurations
  },

  getPortfolioHistory: async () => {
    let portfolioHistory = await alpaca.getPortfolioHistory({
      date_start: //Date,
      date_end: //Date,
      period: //'1M' | '3M' | '6M' | '1A' | 'all' | 'intraday',
      timeframe: //'1Min' | '5Min' | '15Min' | '1H' | '1D',
      extended_hours: //Boolean
    })
    return portfolioHistory
  },


}
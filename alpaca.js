import Alpaca from '@alpacahq/alpaca-trade-api'
import 'dotenv/config'

const { API_KEY, API_SECRET } = process.env

const alpaca = await new Alpaca({
  keyId: API_KEY,
  secretKey: API_SECRET,
  paper: true
});

export { alpaca }

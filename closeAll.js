import { alpaca } from './alpaca.js'

const closeAll = async () => {
  alpaca.closeAllPositions().then(res => console.log(res))
}

closeAll()

export { closeAll }
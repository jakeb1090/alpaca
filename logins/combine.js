import { glendale } from './glendale.js'
import { srp } from './srp.js'

const getStats = () => {
  let results = []

  setTimeout(async () => {
    let data = await glendale()
    await results.push(data)
  }, 2000)

  setTimeout(async () => {
    let data = await srp()
    await results.push(data)
  }, 10000)

  setTimeout(() => console.log('results: ', results), 14000)
}

getStats()
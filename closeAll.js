import { alpaca } from "./alpaca.js"

await alpaca.closeAllPositions().then((res) => console.log(res))
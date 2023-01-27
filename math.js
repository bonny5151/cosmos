JSBI = require("jsbi")

bigint = function(a) {
return JSBI.BigInt(Math.floor(a))
}
outputamount = function(inputreserve, outputreserve, inputamount, fee=998) {
const inputReserve = bigint(inputreserve)
const outputReserve = bigint(outputreserve)
const inputAmount = bigint(inputamount)
fee = JSBI.BigInt(fee)
    const inputAmountWithFee = JSBI.multiply(inputAmount,fee)
    const numerator = JSBI.multiply(inputAmountWithFee, outputReserve)
    const denominator = JSBI.add(JSBI.multiply(inputReserve, JSBI.BigInt(1000)), inputAmountWithFee)
    const outputAmount =  JSBI.divide(numerator, denominator)
  return outputAmount.toString()    
}

module.exports = {

outputamount: outputamount
}

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

/**
calc amount input necessary to bring the average price of trade to executionprice
*/
function calclimit(executionprice, inputreserve, outputreserve, fee = .998)
{
  var ep = executionprice
  var xR = inputreserve
  var yR = outputreserve
  var a = ep / yR;
  var b = ((ep * xR) / (yR * fee)) - 1
  var x = Math.abs(b) / a
  return x
}



module.exports = {

outputamount: outputamount,
calclimit: calclimit
}

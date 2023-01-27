JSBI = require("jsbi")

bigint = function(a) {
return JSBI.BigInt(Math.floor(a))
}



/**
 x y  = k
 (x + x' * fee) (y -  y') = x * y
y - (x y / (x + x' fee)) = y'
y((x+x'fee) - x) 
y(x'fee) / (x+x'fee)


price = y' / x' = 
y * x' fee / (x' (x + x'fee))



*/

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



function orderbook(asks, mintradeamount, maxtradeamount, minprofit, inputreserve, outputreserve, fee=.998)
{
    var currentprice =  outputreserve / inputreserve
    var  maxexecutionprice = currentprice * (1 - minprofit)

      //asks: [[.22,100],[.23,150],[.24,34]]
     var totalamount = 0;
     var avgprice = 0;
             maxexecutionprice = avgprice * (1 - minprofit)

     for(var i = 0; i < asks.length; i++)
     {
         var a= ask[i]
         var price = a[0], amount = a[1]
        if(price >= maxexecutionprice) { break;}
        if(totalamount=0) {avgprice  = price}
        else {}
        newamount = totalamount + amount
        newavg = (prevavg * totalamount + price * amount )/ (totalamount + amount)
        if(newamount < maxamount )
       executionprice = outputamount( reservex, reservey, newamount) / y
       if(executionprice < maxexecutionprice && newamount < maxamount) { newamount; avg = newavg;}
       else {   
            // find amountwithin current limit; 
              break;
        }
 
     }
  


}

module.exports = {

outputamount: outputamount,
calclimit: calclimit
}

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

function newavgprice(prevamount, prevprice, newamount, newprice)
{
 return (prevprice * prevamount + newprice * newamount )/ (prevamount + newamount)
}

/**
  
  prevtotal, o.prevavg
  newamount, o.newprice
return: maxinput
*/

function profitable(prevtrade, newtrade, reservex, reservey, minprofit)
{

    var newamount = prevtrade.totalamount + newtrade.amount
    var newavg = newavgprice(prevtrade.totalamount, prevtrade.avgprice, newtrade.amount, newtrade.price )

    var executionprice = outputamount( reservex, reservey, newamount) / newamount
    maxexecutionprice = newavg * minprofit
   
    if( executionprice < maxexecutionprice ) { return {totalamount: newamount, price : newavg}}
    return 0

}

function updatetrade(trade, newamount){

}

function orderbook(asks, mintradeamount, maxtradeamount, minprofit, inputreserve, outputreserve, fee=.998)
{
    var currentprice =  outputreserve / inputreserve
    var  maxexecutionprice = currentprice * (1 - minprofit)

      //asks: [[.22,100],[.23,150],[.24,34]]
     var totalamount = 0;
     var avgprice = 0;
             maxexecutionprice = avgprice * (1 - minprofit)

     var trade = {totalamount: 0, avgprice: 0}
     for(var i = 0; i < asks.length; i++)
     {
        
         var a= ask[i]
         var price = a[0], amount = a[1]
        if(price >= maxexecutionprice) { break;}
        
        if(trade.totalamount=0) {trade.avgprice  = price}
        if(profitable(trade, ask, reservex, reservey, minprofit)) {
             updatetrade(trade, ask)
         } else if(amount > 100 ) {
             var prof = 0
             var amount2 = 100;
            while(amount2 < amount) {
               if( profitable(trade, ask, reservex, reservey, minprofit, amount2) {
                      prof++;
                      amount2+=100
                   //updatetrade(trade,{amount: 100, price} 
                } 
            }              
            if(prof) { updatetrade(trade,amount2,ask.price)}
           break;
         } else {
           break;
            }
       
     }
  


}

module.exports = {

outputamount: outputamount,
calclimit: calclimit
}

require("../k.js")

var bn = require('@binance/connector').Spot
binance = new bn(binancek1, binancek2)



var bnlib = {
depositHistory: async function(coin, b = binance) {
  return b.depositHistory({coin: coin.toUpperCase(), 
         startTime: (new Date().getTime() - (1000 * 60 * 60 * 24))})
},
findDeposit: async function( coin, txId, b=binance) {
  
   
  var r = await this.depositHistory(coin, b )
  var dep = r.data.find( (dd)=> {return dd.txId == txId})
  return dep
},
waitForDeposit: async function(coin, txId, b = binance) {
   var dep = await this.findDeposit(coin, txId, b)
  if(dep.status == 1  || dep.status==6) {
     return dep
  }  
}
,
balance: async function (coin, b=binance) {
 var d = await b.userAsset()
 if(d.data) {
  return d.data.find(i=>i.asset==coin.toUpperCase())
 } return {}
  
},
price: async function (symbol, b=binance) {
  var d = await b.avgPrice(symbol)
  if(d.data) {
    return d.data.price
  }
 return -1

},

orderbook: async function(symbol, depth=5, b=binance) {
return b.depth(symbol, {limit: depth}).then(i=>i.data)
},

transfer: async function(o, api=binance)
{

var to = o.to? o.to : "trade"

var type = to.match(/trad|spot/) ? "FUNDING_MAIN" : to.match(/fund/) ? "MAIN_FUNDING" : to

// MAIN_FUNDING Spot account transfer to Funding account
//FUNDING_MAIN Funding account transfer to Spot account

//You need to enable Permits Universal Transfer option for the API Key which requests this endpoint.


return api.userUniversalTransfer(type, o.symbol.toUpperCase(),o.amount)
//var t = {type: '', asset: symbol, amount: amt, timestamp: ""}
},

marketorder: async function(o,api=binance) {

//var aa = randomstring()
var sym = o.symbol.toUpperCase()

//sym = getsymbol(sym)
var amountsym = o.amountsymbol || o.symbol2
 amountsym=amountsym.toUpperCase()
var buysell = o.buysell.toUpperCase()
amountsym = amountsym ? amountsym : buysell =="SELL" ? sym.substr(0,4) : sym.substr(-4)
var amount = o.amount
var t= {}

if((sym.startsWith(amountsym))){

 t.quantity = amount +""
} else {
t.quoteOrderQty = amount + ""
 //console.lo
}
return api.newOrder(sym, buysell, 'MARKET', t)
}
/*

{
  id: '3252628909053217281',
  amount: '7',
  coin: 'ATOM',
  network: 'ATOM',
  status: 1,
  address: 'cosmos1j8pp7zvcu9z8vd882m284j29fn2dszh05cqvf9',
  addressTag: '105428095',
  txId: '9889F9EAC1F8C4F934CCF12F567E2C38A9EC7A3C72121600250E1B00CECB6EE4',
  insertTime: 1671830191000,
  transferType: 0,
  confirmTimes: '10/10',
  unlockConfirm: 15,
  walletType: 0
}


*/

}


module.exports = {api: binance, lib: bnlib}

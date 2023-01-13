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

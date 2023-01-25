const k = require('kucoin-node-sdk');
k.init(require('../kc/config.js'));
require("./load.js")


getsymbol = function(sym) {
var sym = sym.replace("/","-").replace("_","-").toUpperCase()
var base = sym.indexOf("US") >=0 ? 4 : 3
if(sym.indexOf("-") == -1) { var sym1 = sym.substr(0,sym.length-base); var sym2 = sym.substr((base * -1),base); sym = sym1 + "-" + sym2; }
sym = sym.toUpperCase()
console.log(sym)

return sym
}

var kclib = {

balance: async function(t,account='', api=k) {
  if(!account) {account = "trade|main";}
  return api.rest.User.Account.getAccountsList().then(i=>
      { if(!t) {return i;} return i.data.filter(i1=>i1.currency == t.toUpperCase() && i1.type.match(account)) }
         )

},

price: async function(sym, orderbookdepth = 20,  api=k) {
sym = getsymbol(sym)
 var s = await kc.api.rest.Market.OrderBook.getLevel2_20(sym).then(i=>i.data)
//if(!i.code ==200000) {//errr}
 return {bids: s.bids.slice(0,orderbookdepth), asks: s.asks.slice(0,orderbookdepth)}

},

avgprice: async function(sym, api=k) {
 var s = await this.price(sym,1,api)
 var bid1 =s.bids[0][0]
 var ask1 = s.asks[0][0]
 return (Number(bid1) + Number(ask1)) / 2
 
},
getsymbol: getsymbol,

marketorder0: async function(sym,buysell, amount, api=k) {
var aa = randomstring()
sym = getsymbol(sym)
return k.rest.Trade.Orders.postOrder({clientOid: aa, side: buysell, symbol: sym, type:'market'},{funds:amount})

}, 
getorder: async function(id) {
 return k.rest.Trade.Orders.getOrderByID(id)
},
marketorder: async function(sym, buysell, amount, api=k){
return this.marketorder0(sym, buysell,amount, api).then(i=> this.getorder(i.data.orderId))
},
sell: async function(sym, api=k) {

}


}


module.exports = {api: k, lib: kclib}

/*

await k.rest.User.Deposit.getDepositAddress("USTC")
await k.rest.User.Account.getAccountsList()
a = await k.rest.User.Account.innerTransfer("aasewr56","USDT","trade","main","0.02")
await k.rest.User.Account.getAccountsList()

aa = await k.rest.User.Withdrawals.applyWithdraw("USDT","0x89b78cfa322f6c5de0abceecab66aee45393cc5a",0.01,{})


findtxdeposit= async function(txid){
 return k.rest.User.Deposit.getDepositList().then(i=>i.data.items.find(i2=>i2.walletTxId.split("@")[0] == txid))
}

ss = await k.rest.Trade.Orders.postOrder({clientOid: aa, side: 'sell', symbol: 'USTC-USDT',type:'market'},{funds:'900'})
ss.data.orderId



{ code: '200000', data: { orderId: '63d183e40adc3300019bcbcf' } }

 d = await k.rest.Trade.Orders.getOrderByID(ss.data.orderId)
d.data.dealFunds



{
  code: '200000',
  data: {
    id: '63d18500baa4cf00017bc95a',
    symbol: 'USTC-USDT',
    opType: 'DEAL',
    type: 'market',
    side: 'sell',
    price: '0',
    size: '0',
    funds: '962.4',
    dealFunds: '21.019246248',
    dealSize: '962.4197',
    fee: '0.021019246248',
    feeCurrency: 'USDT',
    stp: '',
    stop: '',
    stopTriggered: false,
    stopPrice: '0',
    timeInForce: 'GTC',
    postOnly: false,
    hidden: false,
    iceberg: false,
    visibleSize: '0',
    cancelAfter: 0,
    channel: 'API',
    clientOid: 'a647cd96',
    remark: null,
    tags: null,
    isActive: false,
    cancelExist: false,
    createdAt: 1674675456285,
    tradeType: 'TRADE'
  }
}




*/
/**

{string} clientOid - Unique order id created by users to identify their orders, e.g. UUID.
 *   - {string} side - buy or sell
 *   - {string} symbol - a valid trading symbol code. e.g. ETH-BTC
 *   - {string} type - [Optional] limit or market (default is limit)
 *   - {string} remark - [Optional] remark for the order, length cannot exceed 100 utf8 characters
 *   - {string} stop - [Optional] Either loss or entry. Requires stopPrice to be defined
 *   - {string} stopPrice - [Optional] Need to be defined if stop is specified.
 *   - {string} stp - [Optional] self trade prevention , CN, CO, CB or DC
 *   - {string} tradeType - [Optional] The type of trading : TRADE（Spot Trade）, MARGIN_TRADE (Margin Trade). Default is TRADE
 * @param orderParams
 *   LIMIT ORDER PARAMETERS
 *   - {string} price - price per base currency
 *   - {string} size - amount of base currency to buy or sell
 *   - {string} timeInForce - [Optional] GTC, GTT, IOC, or FOK (default is GTC), read Time In Force.
 *   - {number} cancelAfter - [Optional] cancel after n seconds, requires timeInForce to be GTT
 *   - {boolean} postOnly - [Optional] Post only flag, invalid when timeInForce is IOC or FOK
 *   - {boolean} hidden - [Optional] Order will not be displayed in the order book
 *   - {boolean} iceberg - [Optional] Only aportion of the order is displayed in the order book
 *   - {string} visibleSize - [Optional] The maximum visible size of an iceberg order
 * 
 *   MARKET ORDER PARAMETERS / It is required that you use one of the two parameters, size or funds.
 *   - {string} size [Optional] - Desired amount in base currency
 *   - {string} funds [Optional] - The desired amount of quote currency to use

*/

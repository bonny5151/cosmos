const k = require('kucoin-node-sdk');
k.init(require('../kc/config.js'));


var kclib = {

balance: async function(t,account='', api=k) {
  if(!account) {account = "trade|main";}
  return api.rest.User.Account.getAccountsList().then(i=>
      i.data.filter(i1=>i1.currency == t.toUpperCase() && i1.type.match(account))
         )

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
 d = await k.rest.Trade.Orders.getOrderByID(ss.data.orderId)
d.data.dealFunds

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

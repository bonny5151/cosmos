var b = require("./binance.js")
b
terra = require("./terra.js")
require("../k.js")
b.depositHis	tory
b.depositHistory
await b.withdrawHistory( { coin: 'ATOM'})

await b.userAsset()
w = await b.withdraw ( 'ATOM', 'cosmos1cuy44ltl4gmvsy8yyezpez7nt4rs7x2gpld232', 4.75)
await b.withdrawHistory( { coin: 'ATOM'})
await b.withdrawHistory( { coin: 'ATOM'})
await b.withdrawHistory( { coin: 'ATOM'})

a = await b.depositAddress("ATOM")
addr = a.data.address
tag = a.data.tag
cosm = require("./cosm.js")
w31 =await cosm.walletfromkey(cosmk1)
c31 = await cosm.connectrpc(w31)
var balcosmos = await c31.getAllBalances(c31.signer.address)
balcosmos
require2 = function require2(a) {  delete require.cache[require.resolve(a)]; return require(a); }
cosm = require2("./cosm.js")
cc = await cosm.sendtokens(c31, addr, cosm.coins(100, "uatom"), tag)
await b.depositHistory({coin: "ATOM"})
await b.depositHistory({coin: "ATOM"})
a = await b.depositAddress("ATOM")
a.data.tag == tag
a.data.address == addr
cc = await cosm.sendtokens(c31, addr, cosm.coins("5000000", "uatom"), tag)
await b.depositHistory({coin: "ATOM"})
await b.depositHistory({coin: "ATOM"})
await b.depositHistory({coin: "ATOM"})
cc
await b.depositHistory({coin: "ATOM"})
await b.depositHistory({coin: "ATOM"})
dep = await b.depositHistory({coin: "ATOM"})
dep.data[0]
dep.data[3]
dep.data[0].txId
dep.data[0].status == 1
dep = await b.depositHistory({coin: "ATOM"})
dep.data[0].txId
dep.data[0].status == 1
dep = await b.depositHistory({coin: "ATOM"})
dep.data[0].txId
dep.data[0].status == 1
w = await b.newOrder("ATOMBUSD", "SELL", "MARKET", { quantity: 5 })
w.data.cummulativeQuoteQty
w.data.executedQty
w1 = await b.newOrder("USTCBUSD", "BUY", "MARKET", { quoteOrderQty: "50" })
w
cc = await cosm.sendtokens(c31, addr, cosm.coins("500000", "uatom"), tag)
cc = await cosm.sendtokens(c31, addr, cosm.coins("500000", "uatom"), tag)
cc.code == 0
cc.rawLog
cc.transactionHash
await b.depositHistory({coin: "ATOM"})
await b.depositHistory({coin: "ATOM"})
await b.depositHistory({coin: "ATOM"})
await b.depositHistory({coin: "ATOM"})
await b.depositHistory({coin: "ATOM"})
await b.depositHistory({coin: "ATOM"})
await b.userAsset({coin: "ATOM"})
await b.userAsset( "ATOM")
await b.userAsset( {asset: "ATOM"})
await b.depositHistory({coin: "ATOM"})
await b.depositHistory({coin: "ATOM"})
w = await b.newOrder("ATOMBUSD", "SELL", "MARKET", { quantity: 1 })
await b.userAsset( {asset: "BUSD"})
w1 = await b.newOrder("USTCBUSD", "BUY", "MARKET", { quoteOrderQty: "14.98020061" })
terraconnection
terrawallet = await terra.getwallet(terrak1)
var addrt = terrawallet.key.accAddress
addrt
w.data.executedQty
w2 = await b.withdraw("USTC", addrt, w1.data.executedQty)
await b.withdrawHistory( {coin: "USTC"})
gg = await cosmlib.g.SigningStargateClient.connectWithSigner("https://terra-rpc.easy2stake.com:443",terrawallet)
bal = await gg.getAllBalances(addrt)
cosm = require2("./cosm.js")
terra2 = await cosm.connectterra(terrawallet)
terrawallet.key.accAddress
cosm = require2("./cosm.js")
terra2 = await cosm.connectterra(terrawallet)
await terra2.getAllBalances(terra2.address)
await b.userAsset({asset: "BUSD"})
await b.userAsset({asset: "ATOM"})
await b.userAsset({asset: "BUSD"})
await b.userAsset()
await b.myTrades("USTCBUSD")
w2 = await b.withdraw("USTC", addrt, "2236")
await b.withdrawHistory( { coin: "USTC"})

d = await b.depositAddress("USTC")
tt = await terra.sendtokens(terrawallet, d.data.address, "1000000", d.data.tag)
tt.txhash
tt.code == 0
tt.raw_log
await b.depositHistory({coin: "USTC"})
tt = await terra.sendtokens(terrawallet, d.data.address, "10000000", d.data.tag)
await b.depositHistory({coin: "USTC"})
await b.depositHistory({coin: "USTC"})
await b.depositHistory({coin: "USTC"})
await b.depositHistory({coin: "USTC"})
await b.depositHistory({coin: "USTC"})
tt = await terra.sendtokens(terrawallet, d.data.address, "3000000000", d.data.tag)
tt.txhash
hash = tt.txhash
bb = await b.depositHistory({coin: "USTC"})
bb.data.find( (dd)=> {dd.txId == hash})
bb.data.find( (dd)=> {dd.txId == hash})
bb.data[0].txId
hash
bb.data.find( (dd)=> {return dd.txId == hash})
ff = bb.data.find( (dd)=> {return dd.txId == hash})
ff.status
bb = await b.depositHistory({coin: "USTC"})
ff = bb.data.find( (dd)=> {return dd.txId == hash})
ff.status == 1
w1 = await b.newOrder("USTCBUSD", "SELL", "MARKET", { quantity: "3010" })
w1 = await b.newOrder("ATOMBUSD", "BUY", "MARKET", { quoteOrderQty: "67.7" })
c31.address
w31.address
await b.userAsset({asset: "ATOM"})
w1.data.executedQty
avail = await b.userAsset({asset: "ATOM"})
avail = avail.data[0].free
w2 = await b.withdraw("ATOM", w31.address, avail)
w2.data.id
withdrawid = w2.data.id
bb = await b.withdrawHistory({coin: "USTC"})
bb = await b.withdrawHistory({coin: "ATOM"})
ff = bb.data.find( (dd)=> {return dd.id == withdrawid})
ff.status
ff.txId
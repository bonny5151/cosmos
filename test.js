b = require("./binance.js")
//get binance price
await b.lib.price("ATOMBUSD")
await b.lib.price("USTCBUSD")

c = require("./cosm.js")

//get osmosis price
await c.getprice("ustc")

cw = await c.walletfromkey(cosmk3)
ow = await c.walletfromkey(cosmk3,"osmo")
cwc = await c.connectrpc(cw)
owc = await c.connectrpc(ow)

//get osmosis balance
await c.balance(owc)

//get cosmos balance
await c.balance(cwc)

//send ibc from cosmos to osmosis  of atom
f = await c.sendibctokens(cwc, ow.address, c.coins(9300000,"uatom"), channels.atom.c2o)

await c.balance(owc)

//swap atom to osmo  on osmosis
s = await c.swaposmosis(owc,c.getroute(['atom','osmo']),c.coins(10189000,ibctokens.atom), "100000000")
await c.balance(owc)

//get binance balance
await b.lib.balance("ustc")
await b.lib.balance("busd")

//buy 1000 ustc on binance
o = await b.api.newOrder("USTCBUSD", "BUY", "MARKET", { quantity: "1000" })
await b.lib.balance("busd")
await b.lib.balance("ustc")

//buy ustc with 15$ of busd on binance
o = await b.api.newOrder("USTCBUSD", "BUY", "MARKET", { quoteOrderQty: "15" })

//sell 1000 ustcon binance
o = await b.api.newOrder("USTCBUSD", "SELL", "MARKET", { quantity: "1000" })
await b.lib.balance("ustc")
await b.lib.balance("busd")
o.data

//swap osmo to ustc on osmosis
s = await c.swaposmosis(owc,c.getroute(['osmo','ustc']),c.coins(20,"uosmo"), "500")
s = await c.swaposmosis(owc,c.getroute(['osmo','ustc']),c.coins(20000000,"uosmo"), "500000000")

await c.balance(owc)
await c.balance(owc)


terra = require("./terra.js")
//conect to terra lcd
tw = await terra.getwallet(cosmk3)
tw.key.accAddress

//get balance on terra lcd
await terra.balance(tw)
await terra.balance(tw, tw2.address)


//swap osmo to lunc osmosis
s = await c.swaposmosis(owc,c.getroute(['osmo','lunc']),c.coins(5000000,"uosmo"), "1000")}}
await c.getprice("lunc")
await c.balance(owc)

//pay fees in ibc atom tokens on osmosis wen no native osmo
ff =c.getfeeibc(az(1000,6),ibctokens.atom)
ff =c.getfeeibc(az(1000,6),ibctokens.lunc)


//send lunc ibc from osmosis to terra, 
f1 = await c.sendibctokens(owc, tw.address , c.coins(az(2000,6),ibctokens.lunc), "channel-72")

//send  ibc from osmosis to terra
f1 = await c.sendibctokens(owc, tw.address , c.coins(az(20,6),ibctokens.ustc), "channel-72")
f1 = await c.sendibctokens(owc, tw.address , c.coins(az(100,9),ibctokens.lunc), "channel-72")

//send ibc from terra to osmosis
dd = await terra.sendibctoosmosis(tw,"lunc", az(2,9), owc.signer.address)
dd = await terra.sendibctoosmosis(tw,"ust", az(2,6), owc.signer.address)

await terra.balance(tw.lcd, tw.address)

//swap osmo to lunc osmosis
s = await c.swaposmosis(owc,c.getroute(['osmo','lunc']),c.coins(az(100,6),"uosmo"), "50000000000")
await c.balance(owc)

//swap osmo to ustc osmosis
s = await c.swaposmosis(owc,c.getroute(['osmo','ustc']),c.coins(az(5,6),"uosmo"), "50000")


//get higher fee for terra classic
fee = new terralib.Fee(100000, {uluna: 4500000})
fee = terra.getfee()

//send on terra classic 
aa = await terra.sendtokens(tw,tw2.address, az(1,9), "lunc","memo", fee)
aa = await terra.sendtokens(tw,tw2.address, az(1,6), "ustc","", fee)



//connect terra wallet to cosmos rpc
//using rpc 
tw2 = await c.walletfromkey(cosmk3,"terra")
twc = await c.connectterra(tw)
await c.balance(twc)

await c.balance(twc, tw.key.accAddress)

//send lunc ibc from osmosis to terra

ff = await c.sendibctokens(owc, tw.key.accAddress, c.coins(az(6000,6),ibctokens.lunc), "channel-72")
ff = await c.sendibctokens(owc, twc.signer.address, c.coins(az(6000,6),ibctokens.lunc), "channel-72")

f1 = await c.sendibctokens(tw2c, owc.signer.address , c.coins(az(5000,6),ibctokens.lunc), "channel-1", ff)

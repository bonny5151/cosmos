cosm = require("./cosm.js")
require("../k.js")

w3 =await cosm.walletfromkey(cosmk1,"osmo")

w31 =await cosm.walletfromkey(cosmk1)
c3 = await cosm.connectrpc(w3)
c31 = await cosm.connectrpc(w31)

var balosmos = await c3.getAllBalances(c3.signer.address)
var balcosmos = await c31.getAllBalances(c31.signer.address)
console.log("osmoconnection : " + JSON.stringify(balosmos))
console.log("cosmosconnection: " + JSON.stringify(balcosmos))


var wallet2 = await cosm.walletfromkey(cosmk2, "osmo")
var wallet21 = await cosm.walletfromkey(cosmk2)

var conn2 = await cosm.connectrpc(wallet2)
var conn21 = await cosm.connectrpc(wallet21)
v = await cosm.swaposmosis(c3, cosm.getroute(["osmo", "ustc"]), cosm.coins(100,"uosmo"), "1")
console.log(v)
v = await cosm.sendibctokens(c3,w31.address, cosm.coins(10, ibctokens.atom), "channel-0")
console.log(v)
v = await cosm.sendtokens(c3,wallet2.address, cosm.coins(10, ibctokens.ustc))
console.log(v)

//v = await swaposmosis(c3, getroute(['osmo','ustc']), coins(100,"uosmo"), "1")

// v = await swaposmosis(c3,getroute(["usdc","osmo","ustc"]),coins(10,ibctokens.usdc),"1")

//v = await sendibctokens(c3,w31.address, coins(10, ibctokens.atom), "channel-0")

//v = await sendtokens(c3,wallet2.address, coins(10, ibctokens.ustc))

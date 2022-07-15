var key1="harvest fit fault february rose cotton myself feed rural hen tomorrow kangaroo"
w3 =await walletfromkey(key1,"osmo")

w31 =await walletfromkey(key1)
c3 = await connectrpc(w3)
c31 = await connectrpc(w31)

var balosmos = await c3.getAllBalances(c3.signer.address)
var balcosmos = await c31.getAllBalances(c31.signer.address)
console.log("osmoconnection : " + JSON.stringify(balosmos))
console.log("cosmosconnection: " + JSON.stringify(balcosmos))

var key2 = "G9KxuXlDbM7wj0YRu8ahAOIuVbJjIVBcweNSjPWFfwg="

var wallet2 = await walletfromkey(key2, "osmo")
var wallet21 = await walletfromkey(key2)

var conn2 = await connectrpc(wallet2)
var conn21 = await connectrpc(wallet21)
//v = await swaposmosis(c3, buyustwithosmocroute, coins(10000,"uosmo"), "1")
//v = await sendibctokens(c3,w31.address, coins(10, ibctokens.atom), "channel-0")
//v = await sendtokens(c3,wallet2.address, coins(10, ibctokens.ustc))

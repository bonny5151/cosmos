s = require("@cosmjs/proto-signing")
g = require("@cosmjs/stargate")
e = require("@cosmjs/encoding")
key = e.fromBase64("G9KxuXlDbM7wj0YRu8ahAOIuVbJjIVBcweNSjPWFfwg=")
w =await  s.DirectSecp256k1Wallet.fromKey(key)
w1 =await  s.DirectSecp256k1Wallet.fromKey(key, "osmo")
osmojs = require("osmojs")
osmorpc = "https://rpc-osmosis.whispernode.com"
cosmrpc = "https://rpc-cosmoshub.ecostake.com"
osmclient = await osmojs.getSigningOsmosisClient({rpcEndpoint:osmorpc, signer: w1})
cosmclient = await g.SigningStargateClient.connectWithSigner(cosmrpc, w)
await cosmclient.getBalance(cosmclient.signer.address, "uatom")
await osmclient.getBalance(osmclient.signer.address, "uosmo")
w11 = await s.DirectSecp256k1Wallet.fromKey(e.fromBase64("DRd/yMuKF/YiTsa+EUFm6i19kvfHuZsqxgYKSQvC/cs="),"osmo")
w01 = await s.DirectSecp256k1Wallet.fromKey(e.fromBase64("DRd/yMuKF/YiTsa+EUFm6i19kvfHuZsqxgYKSQvC/cs="))
fee = g.calculateFee(100000,g.GasPrice.fromString("0.025ucosm"))
w11.address
a = require("@cosmjs/amino")
a.coins(1,"uosmo")
atomfee = g.calculateFee(100000,g.GasPrice.fromString("0.025uatom"))

fee = g.calculateFee(100000,g.GasPrice.fromString("0.025uosmo"))
v = await osmclient.sendTokens(osmclient.signer.address, w11.address, a.coins(1, "uosmo"),fee)
cosmology = require("@cosmology/core")
fee1 = cosmology.getOsmoFee("swapExactAmountIn")
osmapi = new cosmology.OsmosisApiClient({url: "https://lcd-osmosis.whispernode.com"})
pools = await osmapi.getPools()
pools1 = pools.pools.map(vv=>cosmology.prettyPool(vv))

ustc = "ibc/BE1BB42D4BE3C30D50B68D7C41DB4DFCE9678E8EF8C539F6E6A9345048894FCC"
osmo = "uosmo"
routes= [{poolId: 560, tokenOutDenom: ustc}]
fee1.amount[0].amount= '700'

msg = cosmology.messages.swapExactAmountIn({sender: w1.address, routes: routes, tokenIn: a.coin(100,"uosmo"),tokenOutMinAmount: "1"})

v1 = await osmclient.signAndBroadcast(w1.address, [msg], fee1,'')


//v = await cosmology.signAndBroadcast({client: osmclient, chainId: 'osmosis-1', address: w1.address, msg: msg, fee: fee1, memo: '' });
vv = await osmclient.sendTokens(w1.address, w11.address, a.coins(1,ustc),fee1)
atom1 = "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2"

v2 = await osmclient.sendIbcTokens(w1.address, w.address, a.coin(1,atom1),"transfer", "channel-0", "", Math.floor(Date.now() / 1000) + 60, fee1)
c1 = 'cro1cu3pfakqz7mu5fy0rjr9a8ck8uxpcgl7yt9yjg'
cro = "ibc/E6931F78057F7CC5DA0FD6CEF82FF39373A6E0452BF1FD76910B93292CF356C1"
v2 = await osmclient.sendIbcTokens(w1.address, c1, a.coin(1,cro),"transfer", "channel-5", "", Math.floor(Date.now() / 1000) + 60, fee1)




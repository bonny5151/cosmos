lib = { s : require("@cosmjs/proto-signing"),
        g : require("@cosmjs/stargate"),
       e :  require("@cosmjs/encoding"),
      a : require("@cosmjs/amino"),
     osmojs : require("osmojs")
 }

function getfee(gaslimit=100000, gasprice="0.025", token="uosmo") {
   return lib.g.calculateFee(gaslimit, lib.g.GasPrice.fromString(gasprice + token))
} 
function coins(amount, token) {
  return lib.a(amount, token)
}
async function walletfromkey(key, chain="cosmos") {
var key = lib.e.fromBase64(key)
var w = await lib.s.DirectSecp256k1Wallet.fromKey(key)
return w
}

async function connectrpc(rpcurl, wallet, chain="cosmos")
{
    if(chain != "cosmos") {
      return lib.osmojs.getSigningOsmosisClient({rpcEndpoint:rpcurl, signer: wallet})
   }
   return lib.g.SigningStargateClient.connectWithSigner(rpcurl, wallet)
}
key = "G9KxuXlDbM7wj0YRu8ahAOIuVbJjIVBcweNSjPWFfwg="

w =await walletfromkey(key)

w1 =await walletfromkey(key, "osmo")

osmorpc = "https://rpc-osmosis.whispernode.com"
cosmrpc = "https://rpc-cosmoshub.ecostake.com"
osmclient = await connectrpc(osmorpc, w1)
cosmclient = await connectrpc(cosmrpc, w)
await cosmclient.getBalance(cosmclient.signer.address, "uatom")
await osmclient.getBalance(osmclient.signer.address, "uosmo")
key2 = "DRd/yMuKF/YiTsa+EUFm6i19kvfHuZsqxgYKSQvC/cs="
w11 = await walletfromkey(key2, "osmo")
w01 = await walletfromkey(key2)
fee = getfee(100000,.025,"uatom")

w11.address
coins(1,"uosmo")

fee = getfee(100000,.025, "uosmo")
v = await osmclient.sendTokens(osmclient.signer.address, w11.address, coins(1, "uosmo"),fee)
cosmology = require("@cosmology/core")
fee1 = getfee(250000, .025, "uosmo")
osmapi = new cosmology.OsmosisApiClient({url: "https://lcd-osmosis.whispernode.com"})
pools = await osmapi.getPools()
pools1 = pools.pools.map(vv=>cosmology.prettyPool(vv))

ustc = "ibc/BE1BB42D4BE3C30D50B68D7C41DB4DFCE9678E8EF8C539F6E6A9345048894FCC"
osmo = "uosmo"
routes= [{poolId: 560, tokenOutDenom: ustc}]

msg = cosmology.messages.swapExactAmountIn({sender: w1.address, routes: routes, tokenIn: coins(100,"uosmo"),tokenOutMinAmount: "1"})

v1 = await osmclient.signAndBroadcast(w1.address, [msg], fee1,'')


//v = await cosmology.signAndBroadcast({client: osmclient, chainId: 'osmosis-1', address: w1.address, msg: msg, fee: fee1, memo: '' });
vv = await osmclient.sendTokens(w1.address, w11.address, coins(1,ustc),fee1)
atom1 = "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2"

v2 = await osmclient.sendIbcTokens(w1.address, w.address,coins(1,atom1),"transfer", "channel-0", "", Math.floor(Date.now() / 1000) + 60, fee1)
c1 = 'cro1cu3pfakqz7mu5fy0rjr9a8ck8uxpcgl7yt9yjg'
cro = "ibc/E6931F78057F7CC5DA0FD6CEF82FF39373A6E0452BF1FD76910B93292CF356C1"
v2 = await osmclient.sendIbcTokens(w1.address, c1, coins(1,cro),"transfer", "channel-5", "", Math.floor(Date.now() / 1000) + 60, fee1)




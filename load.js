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
  return lib.a.coins(amount, token)
}
async function walletfromkey(key, chain="cosmos") {
var key;
var w;
if(key.indexOf(" ") >=0) {
 if(chain != 'cosmos') { chain = {prefix: chain}};

  w = await lib.s.DirectSecp256k1HdWallet.fromMnemonic(key, chain)
  adr = await w.getAccounts()
  w.address = adr[0].address
} else {
key  = lib.e.fromBase64(key)

 w = await lib.s.DirectSecp256k1Wallet.fromKey(key, chain)
}
return w
}

async function connectrpc(rpcurl, wallet)
{
    if(wallet.address.toLowerCase().startsWith("osmo")) {
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


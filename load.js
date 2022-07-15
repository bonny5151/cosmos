lib = { s : require("@cosmjs/proto-signing"),
        g : require("@cosmjs/stargate"),
       e :  require("@cosmjs/encoding"),
      a : require("@cosmjs/amino"),
     osmojs : require("osmojs"),
    cosmology : require("@cosmology/core")

 }

function getfee(gaslimit=100000, gasprice="0.025", token="uatom") {
   gaslimit = gaslimit ? gaslimit : 100000;
   gasprice = gasprice ? gasprice : "0.025"
   token = token ? token : "uatom"
   return lib.g.calculateFee(gaslimit, lib.g.GasPrice.fromString(gasprice + token))
} 
function coins(amount, token) {
  return lib.a.coins(amount, token)
}
async function walletfromkey(key, chain="cosmos") {
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

osmorpc = "https://rpc-osmosis.whispernode.com"
cosmrpc = "https://rpc-cosmoshub.ecostake.com"

async function connectrpc(wallet, rpcurl)
{
   var addr = wallet.address.toLowerCase();
  
    if(addr.startsWith("osmo")) {
      if(!rpcurl) {rpcurl = osmorpc;}
      return lib.osmojs.getSigningOsmosisClient({rpcEndpoint:rpcurl, signer: wallet})
   }
   if(!rpcurl) {rpcurl = cosmrpc;}
   return lib.g.SigningStargateClient.connectWithSigner(rpcurl, wallet)
}
function getfeetoken(connection) {
  var address = connection.address ? connection.address: connection.signer.address
  address = address.toLowerCase()
  return address.startsWith("osmo") ? "uosmo" : "uatom"
}
async function sendibctokens(connection, toaddress, tokens, destchannel)
{
 var feetoken = getfeetoken(connection)
 tokens = Array.isArray(tokens) ? tokens[0] : tokens
 var fee1 = getfee(250000, "0.025", feetoken)
 return connection.sendIbcTokens(connection.signer.address, toaddress, tokens, "transfer", destchannel, "", Math.floor(Date.now() / 1000) + 60, fee1)

}

async function sendtokens(connection, toaddress, tokens)
{
  var feetoken = getfeetoken(connection)
  var fee1 = getfee(100000, "0.025",feetoken)
  tokens = Array.isArray(tokens) ? tokens : [tokens]
  return connection.sendTokens(connection.signer.address, toaddress, tokens, fee1)
}

async function swaposmosis(connection, route,inputtokens, minoutputamount)
{
   var addr = connection.signer.address      
   var fee1 = getfee(250000, "0.025", getfeetoken(connection))
   inputtokens = Array.isArray(inputtokens) ?  inputtokens[0] : inputtokens
   var msg = lib.cosmology.messages.swapExactAmountIn({sender: addr, routes: route, tokenIn: inputtokens , tokenOutMinAmount: minoutputamount})
   return connection.signAndBroadcast(addr, [msg], fee1)
}

ibctokens= {
   atom : "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2",
   ustc : "ibc/BE1BB42D4BE3C30D50B68D7C41DB4DFCE9678E8EF8C539F6E6A9345048894FCC"
}

buyustcwithosmoroute = [{poolId: 560, tokenOutDenom: ibctokens.ustc}]

var key1 = "G9KxuXlDbM7wj0YRu8ahAOIuVbJjIVBcweNSjPWFfwg="

//await cosmclient.getBalance(cosmclient.signer.address, "uatom")
//await osmclient.getBalance(osmclient.signer.address, "uosmo")
var key2 = "DRd/yMuKF/YiTsa+EUFm6i19kvfHuZsqxgYKSQvC/cs="
fee = getfee()

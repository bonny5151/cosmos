 cosmlib = { s : require("@cosmjs/proto-signing"),
        g : require("@cosmjs/stargate"),
       e :  require("@cosmjs/encoding"),
      a : require("@cosmjs/amino"),
     osmojs : require("osmojs"),
    cosmology : require("@cosmology/core")

 }

osmorpc = "https://rpc-osmosis.whispernode.com"
cosmrpc = "https://rpc.cosmos.dragonstake.io"
//"https://rpc-cosmoshub.ecostake.com"

 ibctokens =  {
   atom : "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2",
   ustc : "ibc/BE1BB42D4BE3C30D50B68D7C41DB4DFCE9678E8EF8C539F6E6A9345048894FCC",
   usdc : "ibc/D189335C6E4A68B513C10AB227BF1C1D38C746766278BA3EEB4FB14124F1D858"

}

 channels = {
"atom" : { "osmosistocosmos" : "channel-0", "cosmostoosmosis" : "channel-141"},
"ustc" : { "osmosistoterra" : "channel-71"}


}

var poolids = {
 "osmo/ustc" : 560,
 "osmo/usdc" : 678
}


var getroute = function getroute(tokenpath)
{
   var a = []
   for(var i=0; i < tokenpath.length -1; i++) {
      var tokenout = tokenpath[i+1]
      var tokenin = tokenpath[i]
      var poolid = poolids[tokenout + "/" + tokenin] 
      poolid = poolid ? poolid : poolids[tokenin + "/" + tokenout]
      var tokenout2 = (tokenout == "uosmo" || tokenout == "osmo") ? "uosmo" : ibctokens[tokenout]   
     a.push( {poolId: poolid, tokenOutDenom: tokenout2})
  }
  return a
 }

//osmotoustcroute = [{poolId: poolids['osmo/ustc'], tokenOutDenom: ibctokens.ustc}]

routes = {
  osmo_ustc : getroute(["osmo", "ustc"]),
  usdc_ustc : getroute(["usdc","osmo","ustc"]),
  ustc_osmo : getroute(["ustc","osmo"]),
  ustc_usdc : getroute(["ustc","osmo","usdc"])
}

fetch = require("node-fetch")

geturlpath = function(url, ...path) {

path = Array.isArray(path[0]) ?  path[0] : path
url = url + "/" + path.join("/")
return url .replaceAll("//","/").replace(":/","://")

}

fetchjson = async function(url, ...path) {
url = geturlpath(url, path)
return fetch(url,
    {method: "get", headers: {'Content-Type': 'application/json'}}).then(i=>i.json(), i=>{return {}})
}

module.exports = {

 poolIDs : {
  'USTC' : 560,
  'USDC'  : 678
},

 paths : {
  "ustc_osmo": "/tokens/v2/USTC", 
  "ustc_binance" : "/avgPrice?symbol=USTCBUSD",
  "ustc_osmo_lcd" : "/osmosis/gamm/v1beta1/pools/560/prices" //{poolId} hardcoded
},

 urls : {
  "historical": "https://api-osmosis.imperator.co", //only 1 provider, same as info.osmosis.zone
  "lcd1" : "https://lcd.osmosis.zone", //lcd has multiple providers and can be run on your own node
  "lcd2" :  "https://lcd-osmosis.keplr.app",
  "binance" : "https://api.binance.com/api/v3"
},

getfee: function getfee(gaslimit=100000, gasprice="0.025", token="uatom") {
   gaslimit = gaslimit ? gaslimit : 100000;
   gasprice = gasprice ? gasprice : "0.025"
   token = token ? token : "uatom"
   return cosmlib.g.calculateFee(gaslimit, cosmlib.g.GasPrice.fromString(gasprice + token))
} ,
coins: function coins(amount, token) {
  return cosmlib.a.coins(amount, token)
},
walletfromkey : async function walletfromkey(key, chain="cosmos") {
var w;
if(key.indexOf(" ") >=0) {
 if(chain != 'cosmos') { chain = {prefix: chain}};

  w = await cosmlib.s.DirectSecp256k1HdWallet.fromMnemonic(key, chain)
  adr = await w.getAccounts()
  w.address = adr[0].address
} else {
key  = cosmlib.e.fromBase64(key)

 w = await cosmlib.s.DirectSecp256k1Wallet.fromKey(key, chain)
}
return w
},
connectrpc: async function connectrpc(wallet, rpcurl)
{
   var addr = wallet.address.toLowerCase();
  
    if(addr.startsWith("osmo")) {
      if(!rpcurl) {rpcurl = osmorpc;}
      return cosmlib.osmojs.getSigningOsmosisClient({rpcEndpoint:rpcurl, signer: wallet})
   }
   if(!rpcurl) {rpcurl = cosmrpc;}
   return cosmlib.g.SigningStargateClient.connectWithSigner(rpcurl, wallet)
},
connectterra: async function(terrawallet1) {
 var t = await cosmlib.g.SigningStargateClient.connectWithSigner("https://terra-rpc.easy2stake.com:443",terrawallet1)
 t.address = terrawallet1.key.accAddress
 return t
} , 
getfeetoken: function getfeetoken(connection) {
  var address = connection.address ? connection.address: connection.signer.address
  address = address.toLowerCase()
  return address.startsWith("osmo") ? "uosmo" : "uatom"
},
sendibctokens: async function sendibctokens(connection, toaddress, tokens, destchannel)
{
 var feetoken = this.getfeetoken(connection)
 tokens = Array.isArray(tokens) ? tokens[0] : tokens
 var fee1 = this.getfee(250000, "0.025", feetoken)
 return connection.sendIbcTokens(connection.signer.address, toaddress, tokens, "transfer", destchannel, "", Math.floor(Date.now() / 1000) + 60, fee1)

},
sendtokens: async function sendtokens(connection, toaddress, tokens, memo="")
{
  var feetoken = this.getfeetoken(connection)
  var fee1 = this.getfee(100000, "0.025",feetoken)
  tokens = Array.isArray(tokens) ? tokens : [tokens]
  return connection.sendTokens(connection.signer.address, toaddress, tokens, fee1, memo)
},
swaposmosis: async function swaposmosis(connection, route,inputtokens, minoutputamount)
{
   var addr = connection.signer.address      
   var fee1 = this.getfee(250000, "0.025", this.getfeetoken(connection))
   inputtokens = Array.isArray(inputtokens) ?  inputtokens[0] : inputtokens
   var msg = cosmlib.cosmology.messages.swapExactAmountIn({sender: addr, routes: route, tokenIn: inputtokens , tokenOutMinAmount: minoutputamount})
   return connection.signAndBroadcast(addr, [msg], fee1)
},
getroute: getroute,
getpool: async function( poolnum=560,lcdurl="https://lcd.osmosis.zone") {
  return fetchjson(lcdurl,  "osmosis/gamm/v1beta1/pools/" , poolnum)

},
getprice: async function( token="ustc", apiurl = "https://api.osmosis.zone") {
  return fetchjson(apiurl, "/tokens/v2/price/", token).then(i=>i.price)
} 
//osmotoustcroute = [{poolId: poolids['osmo/ustc'], tokenOutDenom: ibctokens.ustc}]


};

//await cosmclient.getBalance(cosmclient.signer.address, "uatom")
//await osmclient.getBalance(osmclient.signer.address, "uosmo")
//var fee = getfee()

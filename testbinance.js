var b = require("./binance.js")
  //s1 = new t.MsgSend(ww.key.address, "terra13ukdfclfk8lylkerz7hkcnmplccvpa4y7pjx8x", {uusd:11})
var terra = require("./terra.js")
require("../k.js")

function printobject(o) {

console.log(JSON.stringify(o))
}

 function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
   }

async function binancedeposits() {
var response = await b.depositHistory({ coin: "USTC"})
var deposits = response.data.length
return [response.status, response.headers, response.data, deposits]
}

;(async ()=> {
terrawallet = await terra.getwallet(terrak1)
ustc =await b.depositAddress("USTC")
addr = ustc.data.address
                    

memo = ustc.data.tag

var sendterratobinance = await terra.sendtokens(terrawallet, addr, 10, memo)
console.log(sendterratobinance)

var deposits = await binancedeposits()
console.log(deposits)
var d = deposits[3]
while(d == deposits[3]) {
 deposits = await binancedeposits()

 await sleep(2000)
}

console.log(deposits)

})();                                                    
/*gg = await lib.g.SigningStargateClient.connectWithSigner("https://terra-rpc.easy2stake.com:443",ww)
bal = await gg.getAllBalances(ww.key.accAddress)
console.log(bal);
*/

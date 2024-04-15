require("../k.js")
terra = require("./terra.js")
terraconnection

var key = ""
;(async function() {

terrawallet = await terra.getwallet(key)
var accn = await terrawallet.accountNumber()
var nonce = await terrawallet.sequence()
var addr = terrawallet.key.accAddress

console.log(accn + " " + nonce + "  " + addr)
var toaddress = "a"
var amountustc = 1
var testsendingustc = await terra.sendtokens(terrawallet, toaddress, amountustc)
console.log(testsendingustc)
})();

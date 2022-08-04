require("../k.js")
terra = require("./terra.js")
terraconnection
var key = terrak1 // "lab audit increase dynamic inspire tilt fire memory result assume position repair curious siege" + 
                    //" quantum turtle betray skin special health symbol enhance dream horn"
;(async function() {

terrawallet = await terra.getwallet(key)
var accn = await terrawallet.accountNumber()
var nonce = await terrawallet.sequence()
var addr = terrawallet.key.accAddress

console.log(accn + " " + nonce + "  " + addr)
var toaddress = "terra13ukdfclfk8lylkerz7hkcnmplccvpa4y7pjx8x"
var amountustc = 1
var testsendingustc = await terra.sendtokens(terrawallet, toaddress, amountustc)
console.log(testsendingustc)
})();

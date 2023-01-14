//https://github.com/terra-money/terra.js


terralib = require("@terra-money/terra.js")
var LCDClient = terralib.LCDClient
var MnemonicKey= terralib.MnemonicKey
var MsgTransfer = terralib.MsgTransfer
var Coin = terralib.Coin



var totoken = function(t) {
 var token = t.toLowerCase()

 return token.match(/^lun/) ? "uluna" : token.match(/^ust/) ? "uusd" : token

}


function getconnection(url = "https://columbus-lcd.terra.dev")
{
  var LCDClient = terralib.LCDClient

  return new LCDClient({
  URL: url,
  chainID: 'columbus-5',
  isClassic: true  // *set to true to connect terra-classic chain*
  });
}

terraconnection = getconnection()


module.exports = {

getconnection: getconnection,
getwallet: function getterrawallet(k, connection=terraconnection) {
  var w = new terralib.MnemonicKey({mnemonic: k})
  var c =connection.wallet(w)
  c.address = c.key.accAddress
  return c
 // c.signer.address = c.address
},
getfee: function(num1=100000, num2=4500000, tok ="uluna") {
var m = {}
m[tok] = num2
return new terralib.Fee(num1,m)
//new terralib.Fee(100000, {uluna: 4500000})
},
sendtokens: async function sendterratokens(wallet, toaddress, amount, token, memo="", fee)
{
   
   token = totoken(token)
    var msg =  {}
    msg[token] = amount
  var s1 = new terralib.MsgSend(wallet.key.accAddress, toaddress, msg)
  var s2 = {msgs: [s1], memo: memo}
  if(fee) { s2.fee = fee}
  return wallet.createAndSignTx(s2).then(tx=> wallet.lcd.tx.broadcast(tx))
 
 },

sendibctoosmosis: async function(wallet, token, amount, address, fee) {
token = totoken(token)

const transfer = new MsgTransfer(
 'transfer',
 'channel-1', 
  new Coin(token, amount), 
   wallet.key.accAddress,
  address,
  undefined, 
  (Date.now() + 60 * 1000) * 1e6,
);


var tx ={ msgs: [transfer] };
if(fee) { tx.fee = fee}
var tx1 = await wallet.createAndSignTx(tx)
return wallet.lcd.tx.broadcast(tx1);



},
balance: async function(connection, address) {
 var c = connection
 var a = address 
 a = a ? a : c.address || c.key.accAddress
 c = c.bank ? c : c.lcd
 return c.bank.balance(a).then(i=>i[0].toData())
}


}



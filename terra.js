//https://github.com/terra-money/terra.js


terralib = require("@terra-money/terra.js")

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
getwallet: async function getterrawallet(k, connection=terraconnection) {
  var w = new terralib.MnemonicKey({mnemonic: k})
  return connection.wallet(w)
},
sendtokens: async function sendterratokens(wallet, toaddress, amountustcortokens, memo="", connection=terraconnection)
{
   var tokens = amountustcortokens
   if( typeof tokens  != 'object') { tokens = {uusd: tokens}}
  var s1 = new terralib.MsgSend(wallet.key.accAddress, toaddress, tokens)
  return wallet.createAndSignTx({ msgs: [s1] , memo: memo}).then(tx=> connection.tx.broadcast(tx))
 
 }
}



function printobject(o) {

console.log(JSON.stringify(o))
}

require2 = function require2(a) {  delete require.cache[require.resolve(a)]; return require(a); }

sleep =  function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
   }
ethers = require("ethers")
addzeroes = function (i, i1, bn1=0) {  var r = ethers.utils.parseUnits(i+"",i1); return bn1 ? r : r.toString();}
removezeroes = function(i,i1, bn1 = 0) { var r = ethers.utils.formatUnits(i+"",i1); return bn1? r: r.toString();}
num = function(i) {return Number.parseFloat(i)}
//min = function(i,i1) { i = bn(i), i1 = bn1(i1) }
az = addzeroes
rz = removezeroes
const crypto = require('crypto');
randomstring = function(length =4 ) {
return crypto.randomBytes(length).toString('hex');
}

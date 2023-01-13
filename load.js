function printobject(o) {

console.log(JSON.stringify(o))
}

require2 = function require2(a) {  delete require.cache[require.resolve(a)]; return require(a); }

sleep =  function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
   }


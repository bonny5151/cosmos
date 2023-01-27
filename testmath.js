c = require("./cosm.js")
b = require("./binance.js")

cosmprice = await c.getprice("ustc")
binanceprice = await b.lib.price("ustcbusd")
if(Number(binanceprice) < cosmprice) 
{
 

 orderbook =  b.lib.orderbook('ustcbusd')

p = await c.getpool2(560)
 osmopr = await c.getprice("osmo")

inputs = [100,200,1000].map(i=> (i * 1/ osmopr)
decimals = 6
aa = c.getoutputs(inputs,'uosmo', p, decimals)



}

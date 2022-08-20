
 await b.depositHistory({coin: "USTC"})

data: [
    {
      amount: '10',
      coin: 'USTC',
      network: 'LUNC',
      status: 0,
      address: 'terra1ncjg4a59x2pgvqy9qjyqprlj8lrwshm0wleht5',
      addressTag: '102923979',
      txId: 'F6F5320B955AFED458784AAF92BB30751EF12C1A4735556945137C7461EBA6E9',
      insertTime: 1660956465000,
      transferType: 0,
      confirmTimes: '1/1',
      unlockConfirm: 0,
      walletType: 0
    },


await b.withdraw("USTC", addrt, "2236")
 data: { id: '0e1dd0e504d6402fad863b8c552ed053' }


b.withdrawHistory( { coin: "USTC"})
data: [
    {
      id: '0e1dd0e504d6402fad863b8c552ed053',
      amount: '2235',
      transactionFee: '1',
      coin: 'USTC',
      status: 4,
      address: 'terra1flmr3vj680wa6y5dxmsdezpn5gfq6x05dntdz4',
      txId: '5DC4DF92F45321C8511B8DA6CA1CF8AD95EB1A2F65750ACADC5BB6797FB811E6',
      applyTime: '2022-08-20 00:37:25',
      network: 'LUNC',
      transferType: 0,
      info: 'terra1fax8l6srhew5tu2mavmu83js3v7vsqf9yr4fv7',
      txKey: ''
    },
    {
      id: '1a557fec861a46c8817255011e209e38',
      amount: '669',
      transactionFee: '1',
      coin: 'USTC',
      status: 6,
      address: 'terra1flmr3vj680wa6y5dxmsdezpn5gfq6x05dntdz4',
      txId: 'EA125E78EF5ED6FB91B569E16EE7F74F52C9945A96F8E3378FA309866F4BB35E',
      applyTime: '2022-08-20 00:19:06',
      network: 'LUNC',
      transferType: 0,
      info: 'terra1kj43wfnvrgc2ep94dgmwvnzv8vnkkxrxmrnhkp',
      confirmNo: 30,
      txKey: ''
    },


w1 = await b.newOrder("ATOMUSDT", "BUY", "MARKET", { quoteOrderQty: 57 })
data: {
    symbol: 'ATOMUSDT',
    orderId: 1669206226,
    orderListId: -1,
    clientOrderId: 'tbU3Nb6HXCuV5F7Epcacl0',
    transactTime: 1660426581540,
    price: '0.00000000',
    origQty: '4.76000000',
    executedQty: '4.76000000',
    cummulativeQuoteQty: '56.90104000',
    status: 'FILLED',
    timeInForce: 'GTC',
    type: 'MARKET',
    side: 'BUY',
    fills: [ [Object] ]
  }


w1 = await b.newOrder("ATOMUSDT", "BUY", "MARKET", { quantity: 57 })
Uncaught Error: Request failed with status code 400
data: {
      code: -2010,
      msg: 'Account has insufficient balance for requested action.'
    }

 data: {
      code: -1104,
      msg: "Not all sent parameters were read; read '5' parameter(s) but was sent '6'.

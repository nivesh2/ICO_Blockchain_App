const Web3 = require('web3')
const constants = require('./constants')

const web3 = new Web3(new Web3.providers.HttpProvider(constants.RPC.azure))
const address = constants.User.account
web3.eth.defaultAccount = address

const BankContract = web3.eth.contract(constants.BankContract.ABI)

// instantiate by address
const bankContract = BankContract.at(constants.BankContract.Address)

function getString(hex) {
  return web3.toAscii(hex).replace(/\u0000/ig, '')
}

function createNewCoin(name, symbol, upperCap, ownerShip, fileHash1, fileHash2) {
  web3.personal.unlockAccount(address, 'thisworldisNowok7')
  return new Promise((resolve, reject) => {
    bankContract.createNewCoin(name, symbol, upperCap, ownerShip, fileHash1, fileHash2, {
      from: address,
    }, (err, res) => {
      if (err) {
        console.log(err.message)
        reject(err)
      }
      resolve(res)
    })
  })
}

function getStatus(coin) {
  return bankContract.getStatus(coin)
}

function setOwnerAmount(coin) {
  web3.personal.unlockAccount(address, 'thisworldisNowok7')
  return new Promise((resolve, reject) => {
    bankContract.setOwnerAmount(coin, {
      from: address,
    }, (err, res) => {
      if (err) {
        console.log(err.message)
        reject(err)
      }
      resolve(res)
    })
  })
}

function setStatus(coin, status) {
  web3.personal.unlockAccount(address, 'thisworldisNowok7')
  return new Promise((resolve, reject) => {
    bankContract.setStatus(coin, status, {
      from: address,
    }, (err, res) => {
      if (err) {
        console.log(err.message)
        reject(err)
      }
      resolve(res)
    })
  })
}

function setRating(coin, rating) {
  web3.personal.unlockAccount(address, 'thisworldisNowok7')
  return new Promise((resolve, reject) => {
    bankContract.setRating(coin, rating, {
      from: address,
    }, (err, res) => {
      if (err) {
        console.log(err.message)
        reject(err)
      }
      resolve(res)
    })
  })
}

function balanceOf(coin, who) {
  web3.personal.unlockAccount(address, 'thisworldisNowok7')
  return new Promise((resolve, reject) => {
    bankContract.setRating(coin, who, {
      from: address,
    }, (err, res) => {
      if (err) {
        console.log(err.message)
        reject(err)
      }
      resolve(res)
    })
  })
}

function transfer(coin, to, amount) {
  web3.personal.unlockAccount(address, 'thisworldisNowok7')
  return new Promise((resolve, reject) => {
    bankContract.transfer(coin, to, amount, {
      from: address,
    }, (err, res) => {
      if (err) {
        console.log(err.message)
        reject(err)
      }
      resolve(res)
    })
  })
}


function getCoins() {
  const data = bankContract.getCoins()
  const coin = {
    name: data[0].map((v) => {
      return getString(v)
    }),
    symbol: data[1].map((v) => {
      return getString(v)
    }),
    upperCapAmount: data[2].map((v) => {
      return v.c[0]
    }),
    ownerShip: data[3].map((v) => {
      return getString(v)
    }),
    rating: data[4].map((v) => {
      return v.c[0]
    }),
    status: data[5].map((v) => {
      return v.c[0]
    }),
  }
  return coin.symbol.map((v, i) => {
    return {
      name: coin.name[i],
      symbol: coin.symbol[i],
      upperCapAmount: coin.upperCapAmount[i],
      ownerShip: coin.ownerShip[i],
      rating: coin.rating[i],
      status: coin.status[i],
    }
  })
}

console.log(getCoins())
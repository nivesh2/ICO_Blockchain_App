const Web3 = require('web3')
const constants = require('./constants')

const web3 = new Web3(new Web3.providers.HttpProvider(constants.RPC.azure))
const address = constants.User.account
web3.eth.defaultAccount = address

const UserContract = web3.eth.contract(constants.UserContract.ABI)

// instantiate by address
const userContract = UserContract.at(constants.UserContract.Address)

function getString(hex) {
  return web3.toAscii(hex).replace(/\u0000/ig, '')
}

function addUser(email, password) {
  web3.personal.unlockAccount(address, 'thisworldisNowok7')
  return new Promise((resolve, reject) => {
    userContract.addUser(email, password, {
      from: address,
    }, (err, res) => {
      if (err) {
        logger.info(err.message)
        reject(err)
      }
      resolve(res)
    })
  })
}

function getUserDetails(key) {
  const user = userContract.getUserDetails(key)
  return {
    email: getString(user[0]),
    password: getString(user[1]),
    filehash1: getString(user[2]),
    filehash2: getString(user[3]),
    fundraiser_amount: user[4].c[0],
    status: user[5].c[0],
  }
}

function getUserCount() {
  return userContract.getPeopleCount().c[0]
}


function getUsers() {
  const data = userContract.getUsers()
  const user = {
    email: data[0].map((v) => {
      return getString(v)
    }),
    filehash1: data[1].map((v) => {
      return getString(v)
    }),
    filehash2: data[2].map((v) => {
      return getString(v)
    }),
    status: data[3].map((v) => {
      return v.c[0]
    }),
    amount: data[4].map((v) => {
      return v.c[0]
    }),
  }
  return user.email.map((v, i) => {
    return {
      email: user.email[i],
      filehash1: user.filehash1[i],
      filehash2: user.filehash2[i],
      status: user.status[i],
      amount: user.amount[i],
    }
  })
}

function amountLeft() {
  return web3.eth.getBalance(address).toNumber() / 10e8
}

function blockNumber() {
  return web3.eth.blockNumber
}

// addUser('nivesh213', 'hello113').then((res) => { logger.info(getUserCount()) })
function setFilehash1(email, filehash) {
  web3.personal.unlockAccount(address, 'thisworldisNowok7')
  return new Promise((resolve, reject) => {
    userContract.setFilehash1(email, filehash, {
      from: address,
    }, (err, res) => {
      if (err) {
        logger.info(err.message)
        reject(err)
      }
      resolve(res)
    })
  })
}

function setFilehash2(email, filehash) {
  web3.personal.unlockAccount(address, 'thisworldisNowok7')
  return new Promise((resolve, reject) => {
    userContract.setFilehash2(email, filehash, {
      from: address,
    }, (err, res) => {
      if (err) {
        logger.info(err.message)
        reject(err)
      }
      resolve(res)
    })
  })
}

function setStatus(email, status) {
  web3.personal.unlockAccount(address, 'thisworldisNowok7')
  return new Promise((resolve, reject) => {
    userContract.setStatus(email, status, {
      from: address,
    }, (err, res) => {
      if (err) {
        logger.info(err.message)
        reject(err)
      }
      resolve(res)
    })
  })
}

function setFundraiserAmount(email, amount) {
  web3.personal.unlockAccount(address, 'thisworldisNowok7')
  return new Promise((resolve, reject) => {
    userContract.setFundraiserAmount(email, amount, {
      from: address,
    }, (err, res) => {
      if (err) {
        logger.info(err.message)
        reject(err)
      }
      resolve(res)
    })
  })
}

// addUser('nivesh217', 'hello117').then((res) => { logger.info(getUserCount()) })

// logger.info(getUserCount())
// setStatus('nivesh217', 2).then((res) => {
//   logger.info(res)
//   logger.info(getUserDetails('nivesh217'), null, 2)
// }).catch((e) => {
//   logger.info(e.message)
// })

// logger.info(getUserDetails('nivesh217'), null, 2)

module.exports = {
  addUser,
  setFilehash1,
  setFilehash2,
  setFundraiserAmount,
}
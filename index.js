// loading .env file
const envVar = require('dotenv').config()

global.env = envVar.parsed

global.logger = require('./app/config').logger

const app = require('./app/server')

app().then(() => {
  logger.info('Server Initialized')
}).catch((err) => {
  logger.error('Error: ', err.message)
})
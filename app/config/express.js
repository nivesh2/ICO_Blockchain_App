/**
 * Setting basic configurations for Express and only expose app (express) object
 * for further processing.
 */
const express = require('express')

const app = express()

module.exports = () => {
  // disabled for security reasons
  app.disable('x-powered-by')
  app.set('env', process.env.NODE_ENV)
  app.set('views', './app/web/views')
  app.set('view engine', 'ejs')
  app.use(express.static('./app/web/public'))

  return app
}
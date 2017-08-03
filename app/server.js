// Starting an API Server to expose functinalities
const { express } = require('./config')

const app = express()

// mounting middlewares
const { requestLoggerMiddleware, basicMiddleware, handleErrorMiddleware } = require('./middleware')


requestLoggerMiddleware(app)
basicMiddleware(app)

// mounting routes
require('./web/router')(app)

handleErrorMiddleware(app)

module.exports = function () {
  return new Promise((resolve, reject) => {
    app.listen(env.PORT, (err) => {
      if (err) {
        logger.error(`Error while starting server at port ${env.PORT} | Error: ${err.message}`)
        return reject(err)
      }
      logger.info(`Environment: ${env.NODE_ENV}`)
      logger.info(`Express Server Up and Running @PORT: ${env.PORT} | at ${env.HOST}`)
      resolve(true)
    })
  })
}
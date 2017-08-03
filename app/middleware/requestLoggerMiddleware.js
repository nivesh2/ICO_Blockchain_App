module.exports = (app) => {
  // setting request logger
  app.use((req, res, next) => {
    logger.info(`--> ${req.method} ${req.path}`)
    next()
  })
}
module.exports = function (app) {
  // Error: 404
  app.use((req, res, next) => {
    next(new Error('Invalid Endpoint'))
  })

  app.use((err, req, res, next) => {
    logger.error(`Error: ${err.message}`)
    res.status(500).json({
      success: false,
      error: err,
    })
  })
}
const debug = require('debug')

const info = debug('app:info')
info.color = debug.colors[4]

const log = debug('app:log')
log.color = debug.colors[1]

const error = debug('app:error')
error.color = debug.colors[5]

module.exports = {
  info,
  log,
  error,
}
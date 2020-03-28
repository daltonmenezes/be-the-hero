const { randomBytes } = require('crypto')

module.exports = n =>
  randomBytes(n).toString('HEX')
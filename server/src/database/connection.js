const knex = require('knex')
const config = require('../../knexfile')
const environment = process.env.MODE || 'development'

module.exports = knex(config[environment])

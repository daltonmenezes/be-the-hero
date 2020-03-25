const { randomBytes } = require('crypto')
const db = require('../database/connection')

module.exports = {
  async index (req, res) {
    const ngos = await db('ngos').select('*')
 
    return res.json(ngos)
  },

  async create (req, res) {
    const {
      name,
      email,
      whatsapp,
      city,
      uf
    } = req.body
  
    const id = randomBytes(4).toString('HEX')
  
    await db('ngos').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    })
  
    return res.json({ id })
  }
}
const db = require('../database/connection')
const generateId = require('../utils/generateId')

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
      stateABB
    } = req.body
  
    const id = generateId(4)
  
    await db('ngos').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      stateABB
    })
  
    return res.json({ id })
  }
}
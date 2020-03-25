const db = require('../database/connection')

module.exports = {
  async create (req, res) {
    const { id } = req.body
    
    const ngo =
      await db('ngos')
        .where('id', id)
        .select('name')
        .first()

    if (!ngo) {
        return res.status(400).json({
          error: 'Ngo not founded with the provieded ID'
        })
    }

    res.json(ngo)
  }
}
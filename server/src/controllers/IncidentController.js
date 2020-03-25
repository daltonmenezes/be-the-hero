const db = require('../database/connection')

module.exports = {
  async index (req, res) {
    const { page = 1 } = req.query

    const [count] = await db('incidents').count()
      
    const incidents =
      await db('incidents')
        .join(
          'ngos',
          'ngos.id',
          '=',
          'incidents.ngo_id'
        )
        .limit(5)
        .offset((page - 1) * 5)
        .select([
          'incidents.*',
          'ngos.name',
          'ngos.email',
          'ngos.whatsapp',
          'ngos.city',
          'ngos.stateABB'
        ])

    res.header('X-Total-Count', count['count(*)'])
    
    return res.json(incidents)
  },

  async create (req, res) {
    const { title, description, amount } = req.body    
    const ngo_id = req.headers.authorization

    const [id] =
      await db('incidents').insert({
        title,
        description,
        amount,
        ngo_id
      })

    res.json({ id })   
  },

  async delete (req, res) {
    const { id } = req.params
    const ngo_id = req.headers.authorization

    const incident =
      await db('incidents')
        .where('id', id)
        .select('ngo_id')
        .first()

    const notAuthorized = incident.ngo_id !== ngo_id
    
    if (notAuthorized) {
        return res.status(401).json({
          error: 'Request not allowed.'
        })
    }

    await db('incidents').where('id', id).delete()

    return res.status(204).send()
  }
}
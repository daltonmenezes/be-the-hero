const { Router } = require('express')
const routes = Router()

const SessionController = require('./controllers/SessionController')
const NgoController = require('./controllers/NgoController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')

routes.post('/sessions', SessionController.create)

routes.get('/ngos', NgoController.index)
routes.post('/ngos', NgoController.create)

routes.get('/incidents', IncidentController.index)
routes.post('/incidents', IncidentController.create)
routes.put('/incidents/:id', IncidentController.update)
routes.delete('/incidents/:id', IncidentController.delete)

routes.get('/profile', ProfileController.index)

module.exports = routes
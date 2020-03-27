const { Router } = require('express')

const {
  SessionValidator, 
  NgoValidator,
  ProfileValidator,
  IncidentValidator
} = require('./validators')

const routes = Router()
const SessionController = require('./controllers/SessionController')
const NgoController = require('./controllers/NgoController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')

routes.post(
  '/sessions',
  SessionValidator(),
  SessionController.create
)

routes.get('/ngos', NgoController.index)

routes.post(
  '/ngos',
  NgoValidator(),
  NgoController.create
)

routes.get(
  '/incidents',
  IncidentValidator.index(),
  IncidentController.index
)

routes.post(
  '/incidents',
  [ProfileValidator(), IncidentValidator.create()],
  IncidentController.create
)

routes.put(
  '/incidents/:id', [
    ProfileValidator(),
    IncidentValidator.update(),
    IncidentValidator.create()
  ],
  IncidentController.update
)

routes.delete(
  '/incidents/:id',
  IncidentValidator.delete(),
  IncidentController.delete
)

routes.get(
  '/profile',
  ProfileValidator(),
  ProfileController.index
)

module.exports = routes
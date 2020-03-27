const { celebrate, Segments, Joi }  = require('celebrate')

module.exports = () =>
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required(),
      city: Joi.string().required(),
      stateABB: Joi.string().required().length(2)
    })
  })
const { Joi } = require('celebrate')

const schemas = {
  makeMovementModel: {
    params: Joi.object().keys({
      id: Joi.string().required()
    }),
    body: Joi.object().keys({
      id: Joi.string().required(),
      player: Joi.string().required(),
      position: Joi.object().keys({
        x: Joi.number().required(),
        y: Joi.number().required()
      })
    })
  }
}

module.exports = schemas

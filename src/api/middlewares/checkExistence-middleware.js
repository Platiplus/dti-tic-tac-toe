// MIDDLEWARE METHOD TO CHECK GAMES EXISTENCE

const checkExistence = (request, response, next) => {
  const manager = require('../utils/manager-util')
  const existence = manager.thisGameExists(request.params.id)

  if (!existence) {
    return response.status(404).json({ msg: 'Partida não encontrada' })
  }

  next()
}

module.exports = checkExistence

// MIDDLEWARE METHOD TO CHECK IF IT IS THAT PLAYER'S TURN

const checkTurn = (request, response, next) => {
  const manager = require('../utils/manager-util')
  const idGame = request.params.id
  const player = request.body.player

  const turn = manager.isThisYourTurn(idGame, player)

  if (!turn) {
    return response.status(400).json({ msg: 'Não é turno do jogador' })
  }
  next()
}

module.exports = checkTurn

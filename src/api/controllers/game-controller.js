// DEPENDENCIES
const Game = require('../models/game-model')

// CONTROL VARS
const manager = require('../utils/manager-util')

// CONTROLLERS
const createGame = (request, response) => {
  const game = new Game()
  game.start()
  manager.watchThisGame(game)
  return response.status(200).json({ id: game.id, firstPlayer: game.playerTurn })
}

const makeMove = (request, response) => {
  const { id } = request.params
  const { player, position } = request.body

  const game = manager.thisGameExists(id)
  game.makeMove(position.x, position.y, player)
  game.takeTurn()

  const winner = game.checkWinner(player)

  if (winner) {
    return response.status(200).json({ msg: 'Partida finalizada', winner: player })
  }

  if (game.turn === 9) {
    return response.status(200).json({ msg: 'Partida finalizada', winner: 'Draw' })
  }

  return response.status(200).json({ msg: 'Movimento computado' })
}

module.exports = {
  createGame,
  makeMove
}

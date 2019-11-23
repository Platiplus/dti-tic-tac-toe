// DEPENDENCIES
const Game = require('../models/game-model')
const GameManager = require('../models/manager-model')

// CONTROL VARS
const manager = new GameManager()
manager.watchOurGames()

// CONTROLLERS
const createGame = (request, response) => {
  const game = new Game()
  game.start()
  manager.watchThisGame(game)
  return response.status(200).json({ id: game.id, firstPlayer: game.playerTurn })
}

const makeMove = (request, response) => {
  // @TODO MAKE MOVE METHOD
}

module.exports = {
  createGame,
  makeMove
}

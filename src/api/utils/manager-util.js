// GAME MANAGER UTILS FILE
// IT IS USED TO EXPORT AN INSTANTIATED GAME MANAGER

const GameManager = require('../models/manager-model')

const manager = new GameManager()

manager.watchOurGames()

module.exports = manager

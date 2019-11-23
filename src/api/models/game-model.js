const uuid = require('uuid/v4')

class Game {
  constructor () {
    this.id = ''
    this.playerTurn = ''
    this.match = [
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined]
    ]
  }

  start () {
    this.id = uuid()
    this.playerTurn = ['X', 'O'][Math.floor(Math.random() * 2)]
  }

  checkWinner () {
    // @TODO METHOD TO CHECK WINNER
  }

  takeTurn () {
    this.playerTurn = this.playerTurn === 'X' ? 'O' : 'X'
  }
}

module.exports = Game

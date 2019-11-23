const uuid = require('uuid/v4')

class Game {
  constructor () {
    this.id = ''
    this.playerTurn = ''
    this.turn = 0
    this.match = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ]
  }

  start () {
    this.id = uuid()
    this.playerTurn = ['X', 'O'][Math.floor(Math.random() * 2)]
  }

  checkWinner (player) {
    const winningConditions = [
      // horizontal
      [this.match[0][0], this.match[0][1], this.match[0][2]],
      [this.match[1][0], this.match[1][1], this.match[1][2]],
      [this.match[2][0], this.match[2][1], this.match[2][2]],

      // vertical
      [this.match[0][0], this.match[1][0], this.match[2][0]],
      [this.match[0][1], this.match[1][1], this.match[2][1]],
      [this.match[0][2], this.match[1][2], this.match[2][2]],

      // diagonal
      [this.match[0][0], this.match[1][1], this.match[2][2]],
      [this.match[0][2], this.match[1][1], this.match[2][0]]
    ]

    const winner = winningConditions.some(condition => condition[0] === player && condition[1] === player && condition[2] === player)
    console.log('WINNER ' + winner)

    return winner
  }

  makeMove (x, y, player) {
    let indexY

    // CONDITIONALS TO MAKE THE Y-AXIS INVERTED TO MATCH SPECIFICATIONS
    if (y === 2) {
      indexY = 0
    } else if (y === 0) {
      indexY = 2
    } else {
      indexY = 1
    }

    this.match[indexY][x] = player
  }

  takeTurn () {
    this.playerTurn = this.playerTurn === 'X' ? 'O' : 'X'
    this.turn++
  }
}

module.exports = Game

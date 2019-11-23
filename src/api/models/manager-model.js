// GAME MANAGER MODEL

class GameManager {
  watchOurGames () {
    this.games = []
  }

  watchThisGame (game) {
    this.games.push(game)
  }

  thisGameExists (_id) {
    return this.games.find((game) => game.id === _id)
  }

  isThisYourTurn (_id, player) {
    const game = this.games.find((game) => game.id === _id)
    const turn = game.playerTurn === player

    return turn
  }
}

module.exports = GameManager

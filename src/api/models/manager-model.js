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
}

module.exports = GameManager

/* eslint-env mocha */
require('dotenv').config()

// DEV DEPENDENCIES
const chai = require('chai')
const expect = chai.expect
const dirtyChai = require('dirty-chai')

// MODELS
const Game = require('../src/api/models/game-model')
const Manager = require('../src/api/models/manager-model')

// MIDDLEWARES
chai.use(dirtyChai)

// GAME MODEL RELATED TESTS
describe('Game Model', () => {
  let game

  beforeEach(() => {
    game = new Game()
    game.start()
  })

  it('Should create a new instance of Game', () => {
    expect(game).to.have.property('id')
    expect(game).to.have.property('playerTurn')
    expect(game).to.have.property('turn')
    expect(game).to.have.property('match')
  })
  it('Should start a game', () => {
    expect(game.id).to.be.not.equal('')
    expect(game.playerTurn).to.satisfy(players)
  })
  it('Should check winners and do not find one', () => {
    expect(game.checkWinner(game.playerTurn)).to.be.false()
  })
  it('Should check winners and find one', () => {
    game.match[0][0] = game.playerTurn
    game.match[0][1] = game.playerTurn
    game.match[0][2] = game.playerTurn
    expect(game.checkWinner(game.playerTurn)).to.be.true()
  })
  it('Should check winners and not find one', () => {
    game.match[0][0] = 'O'
    game.match[0][1] = 'X'
    game.match[0][2] = 'O'
    game.match[1][0] = 'O'
    game.match[1][1] = 'X'
    game.match[1][2] = 'X'
    game.match[2][0] = 'X'
    game.match[2][1] = 'O'
    game.match[2][2] = 'O'
    expect(game.checkWinner(game.playerTurn)).to.be.false()
  })
  it('Should make moves', () => {
    game.makeMove(0, 1, 'X')
    expect(game.match[1][0]).to.be.a.string('X')
  })
  it('Should count turns', () => {
    game.takeTurn()
    expect(game.turn).to.be.equal(1)
  })
})

describe('Manager Model', () => {
  let manager
  let game
  beforeEach(() => {
    manager = new Manager()
    manager.watchOurGames()
    game = new Game()
  })
  it('Should watch games', () => {
    expect(manager.games).to.eql([])
  })
  it('Should register a game', () => {
    manager.watchThisGame(game)
    const length = manager.games.length
    expect(length).to.be.equals(1)
  })
  it('Should check if a game exists', () => {
    manager.watchThisGame(game)
    const exists = manager.thisGameExists(game.id)
    expect(exists).to.have.property('id')
  })
  it('Should check if it is your turn and succeed if it is', () => {
    const player = game.playerTurn
    manager.watchThisGame(game)
    const turn = manager.isThisYourTurn(game.id, player)
    expect(turn).to.be.true()
  })
  it('Should check if it is your turn and fail if it is not', () => {
    const player = game.playerTurn === 'X' ? 'O' : 'X'
    manager.watchThisGame(game)
    const turn = manager.isThisYourTurn(game.id, player)
    expect(turn).to.be.false()
  })
})

const players = (player) => {
  if (player === 'X' || player === 'O') {
    return true
  }
  return false
}

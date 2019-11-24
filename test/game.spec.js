/* eslint-env mocha */
require('dotenv').config()

// DEV DEPENDENCIES
const chai = require('chai')
const expect = chai.expect
const dirtyChai = require('dirty-chai')
const chaiHttp = require('chai-http')
const server = require('../src/app')
const nock = require('nock')

// MIDDLEWARES
chai.use(chaiHttp)
chai.use(dirtyChai)

// GAME RELATED TESTS
describe('Game', () => {
  describe('/POST /game/', () => {
    it('it should create a game', (done) => {
      chai.request(server)
        .post('/game')
        .send()
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(200)
          expect(res.body).to.be.a('object')
          expect(res.body).to.have.property('id')
          expect(res.body).to.have.property('firstPlayer')
          expect(res.body).to.have.property('firstPlayer')
          expect(res.body.firstPlayer).to.satisfy(players)
          done()
        })
    })
  })
  describe('/POST /game/{id}/movement', () => {
    let gameInfo

    beforeEach(async () => {
      gameInfo = await chai.request(server).post('/game').send()
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('it should make a move successfully', (done) => {
      const move = {
        id: gameInfo.body.id,
        player: gameInfo.body.firstPlayer,
        position: {
          x: 0,
          y: 1
        }
      }
      chai.request(server)
        .post(`/game/${gameInfo.body.id}/movement`)
        .send(move)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(200)
          expect(res.body).to.be.a('object')
          expect(res.body).to.have.property('msg').equal('Movimento computado')
          done()
        })
    })
    it('it should fail to make a move if it is not your turn', (done) => {
      const move = {
        id: gameInfo.body.id,
        player: gameInfo.body.firstPlayer === 'X' ? 'O' : 'X',
        position: {
          x: 0,
          y: 1
        }
      }
      chai.request(server)
        .post(`/game/${gameInfo.body.id}/movement`)
        .send(move)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(400)
          expect(res.body).to.be.a('object')
          expect(res.body).to.have.property('msg').equal('Não é turno do jogador')
          done()
        })
    })
    it('it should not move if the game does not exists', (done) => {
      const move = {
        id: gameInfo.body.id,
        player: gameInfo.body.firstPlayer,
        position: {
          x: 0,
          y: 1
        }
      }
      chai.request(server)
        .post('/game/non-existent-game-id/movement')
        .send(move)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(404)
          expect(res.body).to.be.a('object')
          expect(res.body).to.have.property('msg').equal('Partida não encontrada')
          done()
        })
    })
    it('it should return a winner if it exists', (done) => {
      nock(/http:\/\/127\.0\.0\.1/)
        .post(`/game/${gameInfo.body.id}/movement/`)
        .reply(200, { msg: 'Partida finalizada', winner: 'X' })

      const move = {
        id: gameInfo.body.id,
        player: gameInfo.body.firstPlayer,
        position: {
          x: 0,
          y: 1
        }
      }
      chai.request(server)
        .post(`/game/${gameInfo.body.id}/movement/`)
        .send(move)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('msg').equal('Partida finalizada')
          expect(res.body).to.have.property('winner').equal('X')
          done()
        })
    })
    it('it should return a draw if no winner exists', (done) => {
      nock(/http:\/\/127\.0\.0\.1/)
        .post(`/game/${gameInfo.body.id}/movement/`)
        .reply(200, { msg: 'Partida finalizada', winner: 'Draw' })

      const move = {
        id: gameInfo.body.id,
        player: gameInfo.body.firstPlayer,
        position: {
          x: 0,
          y: 1
        }
      }
      chai.request(server)
        .post(`/game/${gameInfo.body.id}/movement/`)
        .send(move)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('msg').equal('Partida finalizada')
          expect(res.body).to.have.property('winner').equal('Draw')
          done()
        })
    })
  })
})

const players = (player) => {
  if (player === 'X' || player === 'O') {
    return true
  }
  return false
}

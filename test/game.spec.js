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
    it('Should create a game', (done) => {
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

    it('Should make a move successfully', (done) => {
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
    it('Should fail to make a move if it is not your turn', (done) => {
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
    it('Should not move if the game does not exists', (done) => {
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
    describe('Test for draw', () => {
      let gameInfo
      let player

      before(async () => {
        gameInfo = await chai.request(server).post('/game').send()
        gameInfo = gameInfo.body
        player = gameInfo.firstPlayer
      })

      beforeEach((done) => {
        chai.request(server).post('/game')
          .send()
          .end(async (err, res) => {
            if (err !== null) console.log(err)
            await chai.request(server).post(`/game/${gameInfo.id}/movement`).send({ id: gameInfo.id, player, position: { x: 0, y: 1 } })
            player = takeTurn(player)
            await chai.request(server).post(`/game/${gameInfo.id}/movement`).send({ id: gameInfo.id, player, position: { x: 0, y: 1 } })
            player = takeTurn(player)
            await chai.request(server).post(`/game/${gameInfo.id}/movement`).send({ id: gameInfo.id, player, position: { x: 0, y: 1 } })
            player = takeTurn(player)
            await chai.request(server).post(`/game/${gameInfo.id}/movement`).send({ id: gameInfo.id, player, position: { x: 0, y: 1 } })
            player = takeTurn(player)
            await chai.request(server).post(`/game/${gameInfo.id}/movement`).send({ id: gameInfo.id, player, position: { x: 0, y: 1 } })
            player = takeTurn(player)
            await chai.request(server).post(`/game/${gameInfo.id}/movement`).send({ id: gameInfo.id, player, position: { x: 0, y: 1 } })
            player = takeTurn(player)
            await chai.request(server).post(`/game/${gameInfo.id}/movement`).send({ id: gameInfo.id, player, position: { x: 0, y: 1 } })
            player = takeTurn(player)
            await chai.request(server).post(`/game/${gameInfo.id}/movement`).send({ id: gameInfo.id, player, position: { x: 0, y: 1 } })
            done()
          })
      })

      it('Should give a draw result in case there is no winner', (done) => {
        const move = {
          id: gameInfo.id,
          player: gameInfo.firstPlayer,
          position: {
            x: 0,
            y: 1
          }
        }
        chai.request(server)
          .post(`/game/${gameInfo.id}/movement`)
          .send(move)
          .end((err, res) => {
            expect(err).to.be.null()
            expect(res).to.have.status(200)
            expect(res.body).to.be.a('object')
            expect(res.body).to.have.property('msg').equal('Partida finalizada')
            expect(res.body).to.have.property('winner').equal('Draw')
            done()
          })
      })
    })
    describe('Test for winner', () => {
      let gameInfo
      let player

      before(async () => {
        gameInfo = await chai.request(server).post('/game').send()
        gameInfo = gameInfo.body
        player = gameInfo.firstPlayer
      })

      beforeEach((done) => {
        chai.request(server).post('/game')
          .send()
          .end(async (err, res) => {
            if (err !== null) console.log(err)
            await chai.request(server).post(`/game/${gameInfo.id}/movement`).send({ id: gameInfo.id, player, position: { x: 0, y: 0 } })
            player = takeTurn(player)
            await chai.request(server).post(`/game/${gameInfo.id}/movement`).send({ id: gameInfo.id, player, position: { x: 1, y: 0 } })
            player = takeTurn(player)
            await chai.request(server).post(`/game/${gameInfo.id}/movement`).send({ id: gameInfo.id, player, position: { x: 1, y: 1 } })
            player = takeTurn(player)
            await chai.request(server).post(`/game/${gameInfo.id}/movement`).send({ id: gameInfo.id, player, position: { x: 2, y: 1 } })
            done()
          })
      })

      it('Should give a winner if there is one', (done) => {
        const move = {
          id: gameInfo.id,
          player: gameInfo.firstPlayer,
          position: {
            x: 2,
            y: 2
          }
        }
        chai.request(server)
          .post(`/game/${gameInfo.id}/movement`)
          .send(move)
          .end((err, res) => {
            expect(err).to.be.null()
            expect(res).to.have.status(200)
            expect(res.body).to.be.a('object')
            expect(res.body).to.have.property('msg').equal('Partida finalizada')
            expect(res.body).to.have.property('winner').equal(move.player)
            done()
          })
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

const takeTurn = (player) => {
  return player === 'X' ? 'O' : 'X'
}

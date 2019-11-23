/* eslint-env mocha */
require('dotenv').config()

// DEV DEPENDENCIES
const chai = require('chai')
const expect = chai.expect
const dirtyChai = require('dirty-chai')
const chaiHttp = require('chai-http')
const server = require('../src/app')

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
  })
})

const players = (player) => {
  if (player === 'X' || player === 'O') {
    return true
  }
  return false
}

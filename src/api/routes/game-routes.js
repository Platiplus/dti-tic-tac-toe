// DEPENDENCIES
const express = require('express')
const router = express.Router()
const controller = require('../controllers/game-controller')
const checkGameExistence = require('../middlewares/checkExistence-middleware')
const checkTurn = require('../middlewares/checkTurn-middleware')

// ROUTES
router.post('/', controller.createGame)
router.post('/:id/movement', checkGameExistence, checkTurn, controller.makeMove)

module.exports = router

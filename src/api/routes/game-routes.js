// DEPENDENCIES
const { celebrate } = require('celebrate')
const express = require('express')
const router = express.Router()
const controller = require('../controllers/game-controller')
const model = require('../models/validation-model')
const checkGameExistence = require('../middlewares/checkExistence-middleware')
const checkTurn = require('../middlewares/checkTurn-middleware')

// ROUTES
router.post('/', controller.createGame)
router.post('/:id/movement', celebrate(model.makeMovementModel), checkGameExistence, checkTurn, controller.makeMove)

module.exports = router

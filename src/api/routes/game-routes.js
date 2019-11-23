// DEPENDENCIES
const express = require('express')
const router = express.Router()
const controller = require('../controllers/game-controller')

// ROUTES
router.post('/', controller.createGame)
router.post('/:id/movement', controller.makeMove)

module.exports = router

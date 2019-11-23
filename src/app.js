// DEPENDENCIES
const bodyParser = require('body-parser')
const { errors } = require('celebrate')
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const app = express()

// ROUTERS
const gameRoutes = require('./api/routes/game-routes')

// MIDDLEWARES
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// ROUTES
app.use('/game', gameRoutes)

// CELEBRATE ERROR HANDLING
app.use(errors())

// ERROR 404 HANDLING
app.use((request, response, next) => {
  return response.status(404).json({ error: true, message: 'Route not found' })
})

// APP EXPORTING
module.exports = app

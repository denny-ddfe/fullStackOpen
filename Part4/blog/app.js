const express = require('express')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const {MONGODB_URI} = require('./utils/config')
const usersRouter = require('./controllers/users')
const loginsRouter = require('./controllers/logins')

const app = express()

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/login', loginsRouter)
app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app


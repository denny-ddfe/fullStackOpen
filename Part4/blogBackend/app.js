const express = require('express')
const mongoose = require('mongoose')

const middleware = require('./utils/middleware')
const {MONGODB_URI} = require('./utils/config')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const commentsRouter = require('./controllers/comments')
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

app.use(express.static('dist'))
app.use(express.json())
//app.use(middleware.requestLogger)
app.use('/api/users', usersRouter)
app.use('/api/login', loginsRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/blogs/:id/comments', commentsRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter) 
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app


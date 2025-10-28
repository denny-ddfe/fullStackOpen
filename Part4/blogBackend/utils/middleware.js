const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, _response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

//##############################################################################

const respondUnauthorized = (response) => {
  return response.status(401).json({error: 'Invalid token'})
}

const userExtractor = async (request, response, next) => {

  //get authorisation header and ensure it starts with "Bearer"
  const authorization = request.get('authorization')
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return respondUnauthorized(response)
  }
  
  //verify the token
  const creds = jwt.verify(
    authorization.replace('Bearer ', ''),
    process.env.SECRET
  )

  //check credentials shape
  if (creds===null || !creds.username || !creds.id ) {
    return respondUnauthorized(response)
  }

  //ensure credential validity
  const tokenUser = await User.findOne({username: creds.username})
  
  if (tokenUser === null) {
    return respondUnauthorized(response)
  }

  request.user = tokenUser
  next()

}

//##############################################################################

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

//##############################################################################

const errorHandler = (error, request, response, next) => {
  
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  }

  next(error)
}

//##############################################################################

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor
}
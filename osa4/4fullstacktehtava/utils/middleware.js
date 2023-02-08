const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error.name ===  'JsonWebTokenError') {
    return response.status(400).json({ error: 'token missing or invalid' })
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  const token =
  authorization && authorization.startsWith('Bearer ')
    ? authorization.replace('Bearer ', '')
    : null

  if(token){
    const verifyToken = jwt.verify(token, process.env.SECRET)

    if(!verifyToken){
      return false
    }else{
      request.token = verifyToken
    }
  }
  next()
}

const userExtractor = async (request, response, next) =>{
  const authorization = request.get('authorization')

  const token =
  authorization && authorization.startsWith('Bearer ')
    ? authorization.replace('Bearer ', '')
    : null

  if(token){
    const decodedToken = jwt.verify(token, process.env.SECRET)

    request.user = await User.findById(decodedToken.id)
    console.log('shitshitshit', request.user) 
  }
 
  
  next()
}



module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor
}
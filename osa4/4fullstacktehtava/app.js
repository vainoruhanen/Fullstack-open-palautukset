
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const config = require('./utils/config.js')
const logger = require('./utils/logger.js')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
require('express-async-errors')




app.use(cors())
app.use(express.static('build'))
app.use(express.json())


app.use(middleware.errorHandler)



const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl)
  .then(() =>{
    logger.info('connected to MongoDB',)
  })
  .catch((error)=>{
    logger.info('Error connecting to MongoDB', error.message)
  })


app.use('/api/users', userRouter)
app.use('/api/login', middleware.tokenExtractor, loginRouter)
app.use('/api/blogs', middleware.tokenExtractor, middleware.userExtractor, blogsRouter)

module.exports = app
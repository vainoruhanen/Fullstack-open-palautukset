const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

 
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  if(!password || password.length < 3){
    response.status(400).send({error: 'Password must contain atleast 3 characters'})
  }else{
    try{
      const savedUser = await user.save()
      response.status(201).json(savedUser)
    }catch (exception){
      response.status(400).send(`error: ${exception}`)
    }
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs')
  response.json(users)
})

module.exports = usersRouter
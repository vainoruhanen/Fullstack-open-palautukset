
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {username : 1 , name: 1})
  response.json(blogs)
})


blogsRouter.delete('/', async (request, response) =>{
  const body = request.body
  const blog = await Blog.findById(body.id)

  const user = request.user

  if(!blog || !user){
    response.status(400).send({error : 'bad request'})
  }else{
    if(blog.user.toString() === user.id.toString()){
      await Blog.findByIdAndRemove(blog.id)
      response.status(204).end()
    }else{
      response.status(400).send({error : 'invalid user'})
    }
  }
  
})

  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  
  const decodedToken = request.token

  const user = await User.findById(decodedToken.id)
  
  if(!body.likes){
    body.likes = 0
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes:body.likes,
    user: user._id
  })

  if(!body.url || !body.title){
    response.status(400).send({error: 'Bad request'})
  }else{
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
     
    response.json(savedBlog)
  }
})

blogsRouter.put('/:id', async (req, res) =>{
  const body = req.body

  const blog = {
    title: body.title,
    likes: body.likes
  }

  const blogi = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.json(blogi)
})

  
blogsRouter.get('/', (req, res) =>{     //lähettää hello worldin sivun perus osotteeseen
  res.send('<h1>Hello world</h1>')
})
    

module.exports = blogsRouter
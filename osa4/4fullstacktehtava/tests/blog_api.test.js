const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const api = supertest(app)
const middleware = require('./utils/middleware')

beforeEach(async ()=>{
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
})




test('blogs are returned as json', async () =>{
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('the id is in proper format', async () =>{ 
  const response = await api.get('/api/blogs')

  response.body.map(r => {
    expect(r.id).toBeDefined()
  })
})


test('Adding blogs with HTTP POST works', async () =>{
  const newBlog = {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(contents).toContain(
    'Type wars'
  )

})

test('if likes arent declared set them to 0', async () =>{
  const newBlog = {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
  

  const response = await api.get('/api/blogs')

  const content = response.body.map(r => r.likes)

  const likes = content[content.length - 1]

  expect(likes).toEqual(0)
})

test('blog without title or url is not added', async () => {
  const newBlog = {
    author: 'Pate'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

describe('deletion of a blog', () =>{
  test('succeeds with status code 204 if id is valid', async() =>{
    const blogsAtStart = await helper.blogsInDB()
    const blogToDelete = blogsAtStart[0]

  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDB()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    expect (blogsAtEnd).not.toContain(blogToDelete)
  }) 
})

describe('editing a blog', () =>{
  test('blogs likes are successfully edited and succeeds with code 201', async() =>{
    const blogsAtStart = await helper.blogsInDB()
    const blogToEdit = blogsAtStart[0]
    const newBlog = {
      id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 353,
    }



    await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDB()
    const editedBlog = blogsAtEnd[0]
  
    expect(editedBlog.likes == newBlog.likes)
  })

 
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})


afterAll(()=>{
  mongoose.connection.close()
})

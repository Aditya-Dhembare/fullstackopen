const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

// Reset the database before every test
beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())

  await Promise.all(promiseArray)
})

// 4.8
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// 4.9
test('all blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)

  assert.strictEqual(
    response.body.length,
    helper.initialBlogs.length
  )
})

// 4.9
test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)

  response.body.forEach(blog => {
    assert.ok(blog.id)
    assert.strictEqual(blog._id, undefined)
  })
})

// 4.10
test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Testing with Supertest',
    author: 'Full Stack Open',
    url: 'https://fullstackopen.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api
    .get('/api/blogs')
    .expect(200)

  assert.strictEqual(
    response.body.length,
    helper.initialBlogs.length + 1
  )

  const titles = response.body.map(blog => blog.title)

  assert(titles.includes('Testing with Supertest'))
})

// Clean database and close MongoDB connection
after(async () => {
  await Blog.deleteMany({})
  await mongoose.connection.close()
})
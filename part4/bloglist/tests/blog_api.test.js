const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Robert C. Martin',
    url: 'http://blog.example.com/html',
    likes: 5
  },
  {
    title: 'Browser can execute only JavaScript',
    author: 'Edsger W. Dijkstra',
    url: 'http://blog.example.com/javascript',
    likes: 10
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')

  const blogs = response.body

  assert(blogs.every(blog => blog.id))
  assert(blogs.every(blog => !blog._id))
})

after(async () => {
  await mongoose.connection.close()
})
const { test, before, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')

const testHelper = require('./test_helper')

const api = supertest(app)

before(async () => {
  await testHelper.connectToDatabase()
})

beforeEach(async () => {
  await testHelper.initializeBlogs()
})

after(async () => {
  await testHelper.closeDatabase()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)

  assert.strictEqual(response.body.length, testHelper.initialBlogs.length)
})

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)

  const blog = response.body[0]

  assert.ok(blog.id)
  assert.strictEqual(blog._id, undefined)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Testing with Supertest',
    author: 'Full Stack Open',
    url: 'https://fullstackopen.com',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await testHelper.blogsInDb()

  assert.strictEqual(
    blogsAtEnd.length,
    testHelper.initialBlogs.length + 1
  )

  const titles = blogsAtEnd.map(blog => blog.title)

  assert(titles.includes('Testing with Supertest'))
})

test('a blog without likes defaults to 0', async () => {
  const newBlog = {
    title: 'Testing default likes',
    author: 'Full Stack Open',
    url: 'https://fullstackopen.com',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  assert.strictEqual(response.body.likes, 0)
})

test('a blog without title or url is not added', async () => {
  const blogWithoutTitle = {
    author: 'Full Stack Open',
    url: 'https://fullstackopen.com',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400)

  const blogsAtEnd = await testHelper.blogsInDb()

  assert.strictEqual(
    blogsAtEnd.length,
    testHelper.initialBlogs.length
  )
})
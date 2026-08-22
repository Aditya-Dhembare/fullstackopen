const mongoose = require('mongoose')
const Blog = require('../models/blog')
const config = require('../utils/config')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
]

const connectToDatabase = async () => {
  console.log('connecting to test MongoDB')

  await mongoose.connect(config.MONGODB_URI)

  console.log('connected to test MongoDB')
}

const closeDatabase = async () => {
  await mongoose.connection.close()
}

const initializeBlogs = async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(initialBlogs)
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})

  return blogs.map(blog => blog.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'willremovethissoon',
    url: 'http://willremovethissoon.com',
    likes: 0,
  })

  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

module.exports = {
  initialBlogs,
  connectToDatabase,
  closeDatabase,
  initializeBlogs,
  blogsInDb,
  nonExistingId,
}
const blogsRouter = require('express').Router()

const Blog = require('../models/blog')

// GET all blogs
blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

// POST a new blog
blogsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    })

    const savedBlog = await blog.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
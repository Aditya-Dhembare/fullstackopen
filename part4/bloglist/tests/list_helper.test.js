const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)

    assert.strictEqual(result, 5)
  })

  test('when list has multiple blogs, equals the total likes', () => {
    const blogs = [
      {
        title: 'Blog 1',
        author: 'Author 1',
        url: 'https://example.com/1',
        likes: 5,
      },
      {
        title: 'Blog 2',
        author: 'Author 2',
        url: 'https://example.com/2',
        likes: 7,
      },
      {
        title: 'Blog 3',
        author: 'Author 3',
        url: 'https://example.com/3',
        likes: 3,
      },
    ]

    const result = listHelper.totalLikes(blogs)

    assert.strictEqual(result, 15)
  })
})
const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const listWithOneBlog = [
      {
        title: 'First blog',
        author: 'Author',
        url: 'https://example.com',
        likes: 5,
      },
    ]

    const result = listHelper.totalLikes(listWithOneBlog)

    expect(result).toBe(5)
  })

  test('when list has multiple blogs, equals the total likes', () => {
    const listWithMultipleBlogs = [
      {
        title: 'First blog',
        author: 'Author',
        url: 'https://example.com',
        likes: 5,
      },
      {
        title: 'Second blog',
        author: 'Author',
        url: 'https://example.com',
        likes: 7,
      },
    ]

    const result = listHelper.totalLikes(listWithMultipleBlogs)

    expect(result).toBe(12)
  })
})
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

describe('favorite blog', () => {
  test('returns the blog with the most likes', () => {
    const blogs = [
      {
        title: 'First blog',
        author: 'Author 1',
        url: 'https://example.com/1',
        likes: 5,
      },
      {
        title: 'Second blog',
        author: 'Author 2',
        url: 'https://example.com/2',
        likes: 12,
      },
      {
        title: 'Third blog',
        author: 'Author 3',
        url: 'https://example.com/3',
        likes: 8,
      },
    ]

    const result = listHelper.favoriteBlog(blogs)

    expect(result).toEqual({
      title: 'Second blog',
      author: 'Author 2',
      url: 'https://example.com/2',
      likes: 12,
    })
  })
})
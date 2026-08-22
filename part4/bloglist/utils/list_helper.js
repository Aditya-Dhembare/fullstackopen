const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  return blogs.reduce((favorite, blog) => {
    return blog.likes > favorite.likes ? blog : favorite
  })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorCounts = {}

  blogs.forEach(blog => {
    authorCounts[blog.author] =
      (authorCounts[blog.author] || 0) + 1
  })

  let mostBlogAuthor = null
  let mostBlogCount = 0

  for (const author in authorCounts) {
    if (authorCounts[author] > mostBlogCount) {
      mostBlogAuthor = author
      mostBlogCount = authorCounts[author]
    }
  }

  return {
    author: mostBlogAuthor,
    blogs: mostBlogCount
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorLikes = {}

  blogs.forEach(blog => {
    authorLikes[blog.author] =
      (authorLikes[blog.author] || 0) + blog.likes
  })

  let mostLikesAuthor = null
  let mostLikeCount = 0

  for (const author in authorLikes) {
    if (authorLikes[author] > mostLikeCount) {
      mostLikesAuthor = author
      mostLikeCount = authorLikes[author]
    }
  }

  return {
    author: mostLikesAuthor,
    likes: mostLikeCount
  }
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
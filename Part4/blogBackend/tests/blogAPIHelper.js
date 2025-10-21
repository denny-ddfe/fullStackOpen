const Blog = require('../models/blog')

const initialBlogs = [
  {
    "title": "React patterns",
    "author": "Michael Chan",
    "url": "https://reactpatterns.com/",
    "likes": 7,
    "user": "68f1d061da31ce8cc39c8605",
    "_id": "68f061b49da585757ea51986"
  },
  {
    "title": "Go To Statement Considered Harmful",
    "author": "Edsger W. Dijkstra",
    "url": "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    "likes": 5,
    "user": "68f1d061da31ce8cc39c8605",
    "_id": "68f061b49da585757ea51987"
  },
  {
    "title": "Canonical string reduction",
    "author": "Edsger W. Dijkstra",
    "url": "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    "likes": 12,
    "user": "68f1d061da31ce8cc39c8605",
    "_id": "68f061b49da585757ea51988"
  },
  {
    "title": "First class tests",
    "author": "Robert C. Martin",
    "url": "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    "likes": 10,
    "user": "68f1d061da31ce8cc39c8605",
    "_id": "68f061b49da585757ea51989"
  },
  {
    "title": "TDD harms architecture",
    "author": "Robert C. Martin",
    "url": "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    "likes": 0,
    "user": "68f6c3e06a5a1734ad133c47",
    "_id": "68f061b49da585757ea5198a"
  },
  {
    "title": "Type wars",
    "author": "Robert C. Martin",
    "url": "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    "likes": 2,
    "user": "68f6c3e06a5a1734ad133c47",
    "_id": "68f061b49da585757ea5198b"
  }
]

const exampleBlog = {
	title: "Hello World!",
  author: "DC",
  url: "http://a.com",
  likes: 69
}

const getAllBlogs = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({ 
    title: 'test blog for generating bad ID',
    author: 'N/A',
    url: 'N/A'
  })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

module.exports = {
	initialBlogs, exampleBlog, getAllBlogs, nonExistingId
}
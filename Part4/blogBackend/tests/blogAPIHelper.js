const Blog = require('../models/blog')

const initialBlogs = [
  {
    "title": "React patterns",
    "author": "Michael Chan",
    "url": "https://reactpatterns.com/",
    "likes": 7,
    "user": "68feedd653e24d10aff46dd9",
		"comments": [],
    "_id": "68f061b49da585757ea51986"
  },
  {
    "title": "2nd",
    "author": "abc",
    "url": "https://abc.com/",
    "likes": 6,
    "user": "68feedd653e24d10aff46dd9",
		"comments": [],
		"_id": "69166b8ecbf8700612f05ea0"
  },
  {
    "title": "3rd", 
    "author": "def",
    "url": "https://def.com/",
    "likes": 5,
    "user": "68feedd653e24d10aff46dd9",
		"comments": [],
		"_id": "69166b8ecbf8700612f05ea1"
  },
  {
    "title": "TDD harms architecture",
    "author": "Robert C. Martin",
    "url": "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    "likes": 0,
    "user": "68feedd653e24d10aff46dda",
		"comments": [],
    "_id": "68f061b49da585757ea5198a"
  },
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
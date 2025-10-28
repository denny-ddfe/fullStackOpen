const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const {initialBlogs} = require('../tests/blogAPIHelper')
const {initialUsers} = require('../tests/userAPIHelper')


testingRouter.post('/reset', async (request, response) => {
	await Blog.deleteMany({})
	await User.deleteMany({})

	await Blog.insertMany(initialBlogs)
	await User.insertMany(initialUsers)

	response.status(204).end()

})

module.exports = testingRouter
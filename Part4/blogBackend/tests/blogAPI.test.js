const assert = require('node:assert')
const { test, after, beforeEach, describe, before } = require('node:test')
const supertest = require('supertest')
const app = require('../app')

const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const blogHelper = require('./blogAPIHelper')
const userHelper = require('./userAPIHelper')
const jwt = require('jsonwebtoken')

const api = supertest(app)

let testToken

beforeEach(async () => {

	const testUser = userHelper.initialUsers[0]

	await User.deleteMany({})
	await User.insertMany(userHelper.initialUsers)

	testToken = jwt.sign({
		username: testUser.username,
		id: testUser._id
	}, process.env.SECRET)
	//console.log(testToken)

	await Blog.deleteMany({})
	await Blog.insertMany(blogHelper.initialBlogs)
})

//##############################################################################

describe('Reading', () => {

	test('Get all blogs', async ()=>{
		const response = await api
			.get('/api/blogs')
			//.set('Authorization', `Bearer ${testToken}`)
		assert(response.body.length===blogHelper.initialBlogs.length)
	})
})

//##############################################################################

describe('Writing', () => {

	test('basic functionality', async()=>{
		
		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${testToken}`)
			.send(blogHelper.exampleBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const allBlogs = await blogHelper.getAllBlogs()
		const allTitles = allBlogs.map(blog=>blog.title)

		assert(allBlogs.length === blogHelper.initialBlogs.length + 1)
		assert(allTitles.includes("Hello World!"))

	})

	////////////////////////////////////////////////////////////////////////////

	describe('Blog schema validation', () => {

		test('missing title => 400', async () => {
			const { title, ...titleMissing } = blogHelper.exampleBlog

			await api
				.post('/api/blogs')
				.set('Authorization', `Bearer ${testToken}`)
				.send(titleMissing)
				.expect(400)
		})

		//----------------------------------------------------------------------

		test('missing url => 400', async () => {
			const { url, ...urlMissing } = blogHelper.exampleBlog

			await api
				.post('/api/blogs')
				.set('Authorization', `Bearer ${testToken}`)
				.send(urlMissing)
				.expect(400)
		})

		//----------------------------------------------------------------------

		test('missing likes => defaults to 0', async () => {
			const { likes, ...likesMissing } = blogHelper.exampleBlog

			await api
				.post('/api/blogs')
				.set('Authorization', `Bearer ${testToken}`)
				.send(likesMissing)
				.expect(201)
				.expect('Content-Type', /application\/json/)

			const createdBlog = await Blog.find({ title: blogHelper.exampleBlog.title })
			assert(createdBlog[0].likes === 0)
		})
	})


})

//##############################################################################

describe('Updating', () => {

	test('basic functionality', async () => {

		await api
			.put(`/api/blogs/${blogHelper.initialBlogs[0]._id}`)
			.set('Authorization', `Bearer ${testToken}`)
			.send({...blogHelper.initialBlogs[0], likes: 10})
			.expect(200)
		
		const updatedBlog = await Blog.findById(blogHelper.initialBlogs[0]._id)
		assert(updatedBlog.likes === 10)

	})

	////////////////////////////////////////////////////////////////////////////

	test('ID not found => 404', async () => {
		
		const badId = await blogHelper.nonExistingId()
		await api
			.put(`/api/blogs/${badId}`)
			.set('Authorization', `Bearer ${testToken}`)
			.send(blogHelper.initialBlogs[0])
			.expect(404)

	})

})

//##############################################################################

describe('Deleting', () => {

	test('basic functionality', async () => {
		
		//find a blog created by the test user
		const blogToDelete = blogHelper.initialBlogs.find((blog) => {
			return blog.user.toString() === userHelper.initialUsers[0]._id
		})

		assert(blogToDelete, 'Bad test data - no blogs created by test user')

		await api
			.delete(`/api/blogs/${blogToDelete._id}`)
			.set('Authorization', `Bearer ${testToken}`)
			.expect(204)
		
		allBlogsAfter = await blogHelper.getAllBlogs()
		assert(allBlogsAfter.length === blogHelper.initialBlogs.length - 1)

	})

	////////////////////////////////////////////////////////////////////////////

	test('ID not found => 404', async () => {
		
		const badId = await blogHelper.nonExistingId()
		await api
			.delete(`/api/blogs/${badId}`)
			.set('Authorization', `Bearer ${testToken}`)
			.expect(404)

	})

	////////////////////////////////////////////////////////////////////////////

	test('Attempting to delete someone else\'s note => 401', async () => {
		
	//find a blog not created by the test user
		const blogToDelete = blogHelper.initialBlogs.find((blog) => {
			return blog.user.toString() !== userHelper.initialUsers[0]._id
		})

		assert(blogToDelete, 'Bad test data - all blogs created by test user')

		await api
			.delete(`/api/blogs/${blogToDelete._id}`)
			.set('Authorization', `Bearer ${testToken}`)
			.expect(401)

	})

})

//##############################################################################

test('blog has id property', async ()=>{
	const response = await api
		.get('/api/blogs')
		.set('Authorization', `Bearer ${testToken}`)
	assert(response.body[0].hasOwnProperty('id'))
})

//##############################################################################

after(async() => {
	await mongoose.connection.close()
})
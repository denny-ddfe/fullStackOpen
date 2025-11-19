const ObjectId = require('mongoose').Types.ObjectId
const commentsRouter = require('express').Router({ mergeParams: true })
const Comment = require('../models/comment')
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

commentsRouter.post('/', userExtractor, async (request, response) => {

	const blog = await Blog.findById(request.params.id)
 
	if (!blog) {
		return response.status(404).json({error: 'blog to comment not found'})
	}

	const result = await new Comment(
		{...request.body, blog: request.params.id}
	).save()

	blog.comments = blog.comments.concat(result._id)
	await blog.save()

	return response.status(201).json(result)

})

commentsRouter.get('/', async (request, response) => {

	const comments = await Comment.find({
		blog: new ObjectId(request.params.id)
	})

	return response.json(comments)
	
})

commentsRouter.put('/:id', async(request, response) => {

})

commentsRouter.delete('/', async(request, response) => {

	await Comment.deleteMany({blog: request.params.id})
	return response.status(204).end()

})

module.exports = commentsRouter
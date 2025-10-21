const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const {userExtractor} = require('../utils/middleware')

blogsRouter.post('/', userExtractor, async (request, response) => {

  const blog = new Blog({...request.body, user: request.user.id})

  result = await blog.save()
  
  request.user.blogs = request.user.blogs.concat(result._id)
  await request.user.save()

  response.status(201).json(result)

})

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({})
    .populate('user', {
      name: 1,
      username: 1,
    })
  response.json(blogs)
})

blogsRouter.put('/:id', userExtractor, async(request, response) => {

  const blogToUpdate = await Blog.findById(request.params.id)
  if (blogToUpdate === null) {
    response.status(404).end()
    return
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body, 
    {new: true, runValidators: true}
  )
  response.status(200).json(updatedBlog)

})

blogsRouter.delete('/:id', userExtractor, async(request, response) => {

  const blogToDelete = await Blog.findById(request.params.id)
  if (blogToDelete === null) {
    return response.status(404).end()
  }
  if (blogToDelete.user.toString() !== request.user.id) {
    return response.status(401).json({error: 'Blog not created by logged in user'})
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()

})

module.exports = blogsRouter
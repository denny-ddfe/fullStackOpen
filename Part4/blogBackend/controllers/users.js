const usersRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {

  const { username, name, password } = request.body

  if (password.length<3) {
    response.status(400).json({error:'Password must be at least 3 characters'})
    return
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (_request, response) => {
    const allUsers = await User.find({})
      .populate('blogs', {
        title: 1,
        author: 1,
        url: 1,
        likes: 1
      })
    response.status(200).json(allUsers)
})

usersRouter.put('/:id', async(request, response) => {

})

usersRouter.delete('/:id', async(request, response) => {

})

module.exports = usersRouter
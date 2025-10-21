const User = require('../models/blog')

initialUsers = [
    {
        "_id": "68f1d061da31ce8cc39c8605",
        "username": "testUsername",
        "passwordHash": "$2b$10$BbDSBoQ31w0gQZS6XtWR/eAUYcdX4ZYub.N/f.xg4kwTrqLUnmnIi",
        "name": "test username",
    },
    {
        "_id": "68f6c3e06a5a1734ad133c47",
        "username": "second test user",
        "passwordHash": "$2b$10$kcCLUtDh.sjBqYaM2fzko.9DKmw6pQRUM1Zwr.0UZMjNmrS40X0bC",
        "name": "test name",
        "__v": 0
    }
]

module.exports = {initialUsers}
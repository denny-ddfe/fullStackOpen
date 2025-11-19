const initialUsers = [
    {   
        "_id": "68feedd653e24d10aff46dd9",
        "username": "testUsername",
        "passwordHash": "$2b$10$BbDSBoQ31w0gQZS6XtWR/eAUYcdX4ZYub.N/f.xg4kwTrqLUnmnIi",
        "name": "test username",
        "blogs": [
					"68f061b49da585757ea51986",
					"69166b8ecbf8700612f05ea0",
					"69166b8ecbf8700612f05ea1"
				]
    },
    {
        "_id": "68feedd653e24d10aff46dda",
        "username": "asdf",
        "passwordHash": "$2b$10$stQx7NR9.ORSJa7BkA1Z8eIixBYPUZ6dtmw7tbw8XFlp4wSSnzcoK",
        "name": "test name",
        "blogs": ["68f061b49da585757ea5198a"]
    }
]

module.exports = {initialUsers}
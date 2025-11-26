const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const {GraphQLError} = require('graphql')
const config = require('./utils/config')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { initialAuthors, initialBooks } = require('./sampleData')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `

	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}

	type Author {
		name: String!
		id: ID!
		born: Int
		bookCount: Int!
	}

	type Book {
		title: String!
		published: Int!
		author: Author!
		id: ID!
		genres: [String!]!
	}

  type Query {
    bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
		me: User
  }

	type Mutation {

		addBook(
			title: String!, 
			author: String!, 
			published: Int, 
			genres: [String!]!
		): Book!

		editAuthor(author:String!, born:Int!): Author

		reset: Boolean!

		createUser(
			username: String!
			favoriteGenre: String!
		): User

		login(
			username: String!
			password: String!
		): String

	}
`

const checkLogin = (context) => {
	if(!context.loggedInUser) {
		throw new GraphQLError('Action unauthorized', {
			extensions: {
				code: 'FORBIDDEN'
			}
		})
	}
}

const resolvers = {

	Book: {
		author: async (root) => await Author.findById(root.author)
	},

	Author: {
		bookCount: async (root) => await Book.countDocuments({author:root.id})
	},

  Query: {
    bookCount: async () => await Book.countDocuments({}),
		authorCount: async () => await Author.countDocuments({}),
		allAuthors: async () => await Author.find({}),

		allBooks: async (root, args) => {
			//author received as Mongoose ID 
			let filter = {}
			if (args.author) {filter.author = args.author}
			if (args.genre) {filter.genres = args.genre}
			return await Book.find(filter)
		},

  }, 

	Mutation: {

		addBook: async (root, args) => {

			checkLogin(context)

			//author received as string.
			//gotta be this way - sometimes the user will want to create a new author

			const badArgs = []
			const authorMinLength = Author.schema.path('name').options.minlength
			const titleMinLength = Book.schema.path('title').options.minlength
			//check argument lengths
			if (args.author.length<authorMinLength) {badArgs.push(args.author)}
			if (args.title.length<titleMinLength) {badArgs.push(args.title)}
			
			if (badArgs.length>0) {
				throw new GraphQLError('Saving book failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: badArgs
					}
				})
			}

			//search for author
			let author = await Author.findOne({name:args.author})
			
			//make new author if not found
			if (!author) {
				author = new Author({name:args.author})
				await author.save()
			}

			//make book
			const newBook = new Book({
				...args, 
				author:author.id
			})
			await newBook.save()

			return newBook

		},

		//--------------------------------------------------------------------------

		editAuthor: async (root, args, context) => {

			checkLogin(context)

			//author received as Mongoose ID
			const authorToEdit = await Author.findById(args.author)
			authorToEdit.born = args.born
			await authorToEdit.save()
			return authorToEdit

		},

		//--------------------------------------------------------------------------

		reset: async () => {
			await Author.deleteMany({})
			await Book.deleteMany({})
			await Author.insertMany(initialAuthors)

			const allAuthors = await Author.find({})

			const booksToInsert = initialBooks.map(book=> {
				return {
					...book, 
					author: allAuthors.find(author=>author.name===book.author).id
				}
			})

			await Book.insertMany(booksToInsert)

			return true
		},

		//--------------------------------------------------------------------------

		createUser: async (root, args) => {

			const user = new User({ ...args })
			const error = user.validateSync()
			if (error) {
				throw new GraphQLError(error.message, {
					extensions: {
						code: 'BAD_USER_INPUT'
					}
				})
			}

			return await user.save()
		},

		//--------------------------------------------------------------------------

		login: async (root, args) => {
			const user = await User.findOne({ username: args.username })

			if ( !user || args.password !== 'secret' ) {
				throw new GraphQLError('wrong credentials', {
					extensions: {
						code: 'BAD_USER_INPUT'
					}
				})        
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			}

			return jwt.sign(userForToken, process.env.SECRET)
		},

	}

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
	context: async ({req, res}) => {

		const authorization = req.headers.authorization
		if (!authorization || !authorization.startsWith('Bearer ')) {
			return {loggedInUser: null}
		}

		const creds = jwt.verify(
			authorization.replace('Bearer ', ''),
			config.SECRET
		)

		if (creds===null || !creds.username || !creds.id ) {
			return {loggedInUser: null}
		}

		return {loggedInUser:creds}
	}
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

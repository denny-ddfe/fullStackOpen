//setup  -----------------------------------------------------------------------

//libraries
const express = require('express')
const morgan = require('morgan')


const app = express()

//add 'body' token to morgan with a string representation of
//the body created by express.json()
morgan.token('body', (req, res)=>JSON.stringify(req.body))

//middlewares
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(
	':method :url :status ' + 
	':res[content-length] - :response-time ms ' + 
	':body'
))

//middleware for error handling of new objects
app.use((req, res, next) => {

	//missing properties check
	if (req.body && (!req.body.name || !req.body.number)) {
    return res.status(400).json({ 
      error: 'Incorrectly configured object' 
    })
  }

	next()

})

//app data  --------------------------------------------------------------------
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

//create  ----------------------------------------------------------------------

//unique name check
const checkDuplicate = (req, res, next) => {

	if (persons.some((person)=>person.name===req.body.name)) {
		return res.status(400).json({ 
      error: 'name must be unique' 
    })
	}

	next()

}

const generateId = () => {
  return Math.floor(100000*Math.random()).toString()
} 

app.post('/api/persons', checkDuplicate, (req, res) => {
  const body = req.body 

  const person = {
		id: generateId(),
    name: body.name,
		number: body.number,
  }

  persons = persons.concat(person)
  res.json(person)

})

//read  ------------------------------------------------------------------------

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/info', (request, response) => {
  response.send(
		`<p>Phonebook has info for ${persons.length} people</p>` +
		`<p>${new Date()}</p>`

	)
})
 
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

//update  ----------------------------------------------------------------------

//extra middleware to ensure resource exists before update/delete
const checkExist = (req, res, next) => {

	if (
		(req.method === 'PUT' || req.method === 'DELETE') &&
		!persons.some((person)=>person.id===req.params.id)
	) {
		return res.status(404).json({ 
      error: 'Unable to find entry' 
    })
	}

	next()

}

app.put('/api/persons/:id', checkExist, (req, res) => {
	
	const newPerson = {id:req.params.id, ...req.body}

	persons = persons.map(
		(person)=>person.id===req.params.id
			?newPerson
			:person
	)

	res.json(newPerson)

})

//delete  ----------------------------------------------------------------------

app.delete('/api/persons/:id', checkExist, (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

//generic 404  -----------------------------------------------------------------

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

//and done  --------------------------------------------------------------------

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


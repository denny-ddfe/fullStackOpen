//setup  -----------------------------------------------------------------------

//libraries
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const {Person, checkIdFormat} = require('./models/person')

const app = express()

//middlewares
app.use(express.static('dist'))
app.use(express.json())

//add 'body' token to morgan with a string representation of
//the body created by express.json()
morgan.token('body', (req, res)=>JSON.stringify(req.body))

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

//create  ----------------------------------------------------------------------

//unique name check
const checkDuplicate = (req, res, next) => {

	Person.findOne({name: req.body.name}).then(person=> {
		if (person!==null) {
			return res.status(400).json({ 
				error: 'name must be unique' 
			})
		}
		next()
	})

}

app.post('/api/persons', checkDuplicate, (req, res, next) => {
  const body = req.body 

  const person = new Person({
    name: body.name,
		number: body.number,
  })

	person.save()
	.then(savedPerson=>{res.json(savedPerson)})
	.catch(err=>next(err)) 

})

//read  ------------------------------------------------------------------------

app.get('/api/persons/:id', checkIdFormat, (req, res) => {
  Person.findById(req.params.id)
	.then(person => {
		if (person){res.json(person)}
		else {res.status(404).end()}
    
  })
	.catch(err=>next(err)) 
})

app.get('/info', (req, res) => {
	Person.countDocuments({}).then(count => {
    res.send(
			`<p>Phonebook has info for ${count} people</p>` +
			`<p>${new Date()}</p>`
		)	
  })
})
 
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

//update  ----------------------------------------------------------------------

app.put('/api/persons/:id', checkIdFormat, (request, response, next) => {
  const id = request.params.id;
  const { name, number } = request.body;

  Person.findByIdAndUpdate(
    id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
	.then(updatedPerson => {
		if (updatedPerson) {
			response.json(updatedPerson);
		} else {
			response.status(404).json({ error: 'Person not found' });
		}
	})
	.catch(err=>next(err)) 
});


//delete  ----------------------------------------------------------------------

app.delete('/api/persons/:id', checkIdFormat, (request, response) => {
  const id = request.params.id;

  Person.findByIdAndDelete(id)
    .then((deletedPerson) => {
			if (deletedPerson) 	{response.status(204).end()}
			else								{response.status(404).end()}
		
		})
    .catch(err=>next(err)) 
});

//generic error
const errorHandler = (err, req, res, next) => {
	if (err.name==='ValidationError') {
		return res.status(400).json({ error: err.message })
	}
  res.status(500).end()
}

app.use(errorHandler)

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


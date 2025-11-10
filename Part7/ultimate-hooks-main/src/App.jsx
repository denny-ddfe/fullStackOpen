import { useState, useEffect } from 'react'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

	const errMiddleware = (response) => {
		if (!response.ok) {
			throw new Error(`HTTP error status: ${response.status}`);
		}
		return response.json()
	}

	//getAll embedded in useEffect - no need for outer application to ever call it
  useEffect(() => {
		fetch(baseUrl)
		.then((response) => {
			return errMiddleware(response)
		})
		.then((json)=>{
			setResources(json)
		})
		.catch((err) => {
			console.log(err)
		})
	}, [baseUrl])

  const create = (resource) => {

    const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(resource)
		}

		fetch(baseUrl, options)
		.then((response) => {
			return errMiddleware(response)
		})
		.then((json) => {
			setResources(resources.concat(json))
		})
		.catch((err) => {
			console.log(err)
		})

  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App
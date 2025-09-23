import { useState, useRef } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

	//initial numbers
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

	//search field. This is a controlled state for on-the-fly updates
	const [search, setSearch] = useState('')

	//Name and number inputs. These are simple inputs, since we don't care...
	//about their values until submission of form
	const nameRef = useRef(null)
	const numRef	= useRef(null)

	//handle form submission
	const handleSubmit = (event) => {
		
		event.preventDefault()
		
		//aliases
		const newName = nameRef.current.value
		const newNum = numRef.current.value

		//duplicate check
		if (persons.some((person)=>person.name===newName)) {
			alert(`${newName} is already added to phonebook`)
			return
		}

		//add new person
		setPersons(persons.concat({
			name: newName, 
			number: newNum,
			id: persons[persons.length-1].id + 1
		}))

		nameRef.current.value=''
		numRef.current.value=''

	}

	//rendered page
  return (
    <div>
      <h2>Phonebook</h2>
			<Filter	value={search} updateFunc={setSearch}/>

			<h3>Add new</h3>
      <PersonForm 
				nameRef={nameRef} 
				numRef={numRef} 
				handleSubmit={handleSubmit}
			/>

      <h3>Numbers</h3>
      <Persons persons={persons} search={search}/>
    </div>
  )
}

export default App

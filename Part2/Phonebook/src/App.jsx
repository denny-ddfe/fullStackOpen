import { useState, useRef, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/person'

const App = () => {

	//notif setup  -------------------------------------------------------------------------

	//helper for notifications
	const showNotif = (msg) => {
		setNotif(msg)
		setTimeout(()=>{setNotif(null)},5000)
	}

	//state setup  -------------------------------------------------------------------------

	//initial numbers
  const [persons, setPersons] = useState([])

	//search field. This is a controlled state for on-the-fly updates
	const [search, setSearch] = useState('')

	//notification text
	const [notif, setNotif] = useState(null)

	//Name and number inputs. These are simple inputs, since we don't care...
	//about their values until submission of form
	const nameRef = useRef(null)
	const numRef	= useRef(null)

	//read  --------------------------------------------------------------------------------
	useEffect(()=>{
		personService.getAll()
		.then(
			(personList)=>{setPersons(personList)}
		)
	}, [])

	//update  ------------------------------------------------------------------------------
	const updatePerson = (updatedPerson) => {
		personService.update(updatedPerson)
		.then(updatedPerson=>{
			setPersons(persons.map((person)=>
				person.id===updatedPerson.id?updatedPerson:person
			))
			showNotif({msg:`Updated ${updatedPerson.name}`, type:'success'})
		})
		.catch(()=>{

			showNotif({
				msg:`Information of ${updatedPerson.name} has already been removed from server`,
				type:'error'
			})
			setPersons(persons.filter((person)=>person.id!==updatedPerson.id))
		})
	}

	//write  -------------------------------------------------------------------------------
	const handleSubmit = (event) => {
		
		event.preventDefault()
		
		//aliases
		const newName = nameRef.current.value
		const newNum = numRef.current.value

		//duplicate check
		const duplicate = persons.find((person)=>person.name===newName)
		if (duplicate!==undefined) {
			if (window.confirm(
				`${newName} is already added to phonebook. Update number?`
			)) {
				updatePerson({...duplicate, number:newNum})
			} 
			return
		}
		
		//create new person object. ID is handled by axios
		const newPerson = {
			name: newName, 
			number: newNum,
		}

		//post to api, ensure success before adding to local list
		personService.create(newPerson)
		.then(newPerson=>{
				setPersons(persons.concat(newPerson))
				showNotif({msg:`Added ${newPerson.name}`, type:'success'})
		})

		//reset inputs
		nameRef.current.value=''
		numRef.current.value=''

	}

	//delete  ------------------------------------------------------------------------------
	const deletePerson = (personToDelete) => {
		if (!window.confirm(`Delete ${personToDelete.name}?`)) {return}
		personService.remove(personToDelete)
		setPersons(persons.filter((person)=>person.id!==personToDelete.id))
		showNotif({msg:`Deleted ${personToDelete.name}`, type:'success'})
	}

	//rendered page  -----------------------------------------------------------------------
  return (
    <div>
      <h2>Phonebook</h2>
			<Notification obj={notif}/>
			<Filter	value={search} updateFunc={setSearch}/>

			<h3>Add new</h3>
      <PersonForm 
				nameRef={nameRef} 
				numRef={numRef} 
				handleSubmit={handleSubmit}
			/>

      <h3>Numbers</h3>
      <Persons persons={persons} search={search} handleDelete={deletePerson}/>
    </div>
  )
}

export default App

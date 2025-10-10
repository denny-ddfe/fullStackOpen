const OnePerson = ({person, handleDelete}) => 
	<p>
		{person.name} {person.number}
		<button onClick={()=>{handleDelete(person)}}>delete</button>
	</p>

const Persons = ({persons, search, handleDelete}) => {
	
	return <>
	{persons
		.filter((person)=>person.name.toLowerCase().includes(search.toLowerCase()))
		.map((person)=><OnePerson 
			key={person.id} 
			person={person} 
			handleDelete={handleDelete}
		/>)
	}
	</>
}


export default Persons

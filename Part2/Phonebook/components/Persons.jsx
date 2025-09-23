const OnePerson = ({person}) => 
	<p>{person.name} {person.number}</p>

const Persons = ({persons, search}) => {
	return <>
	{persons
		.filter((person)=>person.name.toLowerCase().includes(search.toLowerCase()))
		.map((person)=><OnePerson key={person.id} person={person}/>)
	}
	</>
}


export default Persons

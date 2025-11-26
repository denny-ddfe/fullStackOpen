import { useState, useEffect } from 'react'
import { SET_BIRTH_YEAR, ALL_AUTHORS } from '../queries'
import { useQuery, useMutation } from '@apollo/client/react'
import Select from 'react-select'

const Authors = () => {

	const [name, setName] = useState('')
	const [born, setBorn] = useState('')

	const [setBirthYear] = useMutation(SET_BIRTH_YEAR, {
		refetchQueries: [ {query: ALL_AUTHORS} ]
	})

	const {
		loading,  
		data: { allAuthors } = {}
	} = useQuery(ALL_AUTHORS)

	useEffect(() => {
		if (allAuthors) {
			setName({value:allAuthors[0].name, label:allAuthors[0].name})
		}
	},[allAuthors])

	if (loading) {
		return <p>Loading...</p>
	}

	const names = allAuthors.map(author=>{
		return {value:author.name, label: author.name}
	})

	const submit = async (event) => {
    event.preventDefault()

     setBirthYear({variables:{name:name.value, born: parseInt(born)}})

    setName('')
    setBorn('')
  }

  return (
    <div>

      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

			<h2>Set birthyear</h2>
				<form onSubmit={submit}>
					<div>
						<Select
							defaultValue={names[0]}
							onChange={setName}
							options={names}
						/>
					</div>
					<div>
						born
						<input
							required
							type='number'
							value={born}
							onChange={({ target }) => setBorn(target.value)}
						/>
					</div>
					<button>update author</button>
				</form>

    </div>
  )
}

export default Authors

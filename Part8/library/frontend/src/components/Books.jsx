import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client/react'

const Books = () => {
	
	const {
		loading,  
		data: { allBooks } = {}
	} = useQuery(ALL_BOOKS)

	if (loading) {
		return <p>Loading...</p>
	}

	console.log(allBooks)
	

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books

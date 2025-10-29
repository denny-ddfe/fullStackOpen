import {useDispatch} from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

 	const dispatch = useDispatch()

  const handleCreate = (event) => {
    event.preventDefault()
    console.log(event.target)
    
    dispatch(createAnecdote(event.target.newAnecdote.value))
    event.target.newAnecdote.value=''
	}

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={handleCreate}>
        <div>
          <input name='newAnecdote'/>
        </div>
        <button>create</button>
      </form>
		</>
	)

}

export default AnecdoteForm
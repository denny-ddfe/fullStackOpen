import {useDispatch} from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {showNotification} from '../reducers/notificationReducer'

const AnecdoteForm = () => {

 	const dispatch = useDispatch()

  const handleCreate = (event) => {
    event.preventDefault()
    
		const newText = event.target.newAnecdote.value
		dispatch(createAnecdote(newText))

		dispatch(showNotification(`created ${newText}`, 5))
    
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
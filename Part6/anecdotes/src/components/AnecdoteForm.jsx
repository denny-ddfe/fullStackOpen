import {useDispatch} from 'react-redux'
import {create} from '../reducers/anecdoteReducer'
import {add, remove} from '../reducers/notificationReducer'

import noteService from '../services/anecdotes'

const AnecdoteForm = () => {

 	const dispatch = useDispatch()

  const handleCreate = (event) => {
    event.preventDefault()
    
		const newText = event.target.newAnecdote.value
		noteService.createNew(newText).then(newNote=>{
			dispatch(create(newNote))
			dispatch(add(`created ${newText}`))
			setTimeout(() => {dispatch(remove(null))}, 5000)
		})
    
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
import {useDispatch} from 'react-redux'
import {create} from '../reducers/anecdoteReducer'
import {change} from '../reducers/notificationReducer'

const AnecdoteForm = () => {

 	const dispatch = useDispatch()

  const handleCreate = (event) => {
    event.preventDefault()
    console.log(event.target)
    
		const newText = event.target.newAnecdote.value
    dispatch(create(newText))
		dispatch(change(`created ${newText}`))
		setTimeout(() => {dispatch(change(''))}, 5000)
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
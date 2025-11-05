import { useSelector, useDispatch } from 'react-redux'
import {vote} from '../reducers/anecdoteReducer'
import {add, remove} from '../reducers/notificationReducer'

const AnecdoteList = () => {

	const anecdotes = useSelector(({anecdotes, filter}) => {
		return anecdotes
		.filter((anecdote)=>{
			return anecdote.content.toLowerCase().includes(filter.toLowerCase())
		})
		.sort((a,b)=>{
			return b.votes-a.votes
		})
	})

	const dispatch = useDispatch()

	const handleVote = (anecdote) => {
		dispatch(vote(anecdote.id))
		dispatch(add(`You voted for '${anecdote.content}'`))
		setTimeout(() => {
			dispatch(remove(null))
		}, 5000)
	}

	return (
		<>
			{anecdotes.map(anecdote => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes} votes
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</>
	)

}

export default AnecdoteList
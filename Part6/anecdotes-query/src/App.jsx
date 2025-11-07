import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {getAll, voteForAnecdote} from './services'

import { useContext } from 'react'
import NotificationsContext from "./contexts/NotificationsContext"
import { showNotification } from './contexts/NotificationActions'

const App = () => {

	const queryClient = useQueryClient()
	const {notificationsDispatch} = useContext(NotificationsContext)

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(anecdote)
  }

	const result = useQuery({
		queryKey:['anecdotes'],
		queryFn: getAll,
		retry: 1
	})

	const voteAnecdoteMutation = useMutation({
		mutationFn: voteForAnecdote,
		onSuccess: (editedAnecdote) => {
			const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map((anecdote) => {
				return anecdote.id===editedAnecdote.id?editedAnecdote:anecdote
			}))
			showNotification(notificationsDispatch, `Voted for ${editedAnecdote.content}`)
		}
	})

	if (result.isLoading) {
    return <div>loading data...</div>
  }

	if (result.isError) {
		return <div>Unable to connect to server.</div>
	}

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App

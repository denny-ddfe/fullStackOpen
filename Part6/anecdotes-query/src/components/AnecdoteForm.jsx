import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services'

import { useContext } from 'react'
import NotificationsContext from "../contexts/NotificationsContext"
import { showNotification } from '../contexts/NotificationActions'

const AnecdoteForm = () => {

	const queryClient = useQueryClient()
	const {notificationsDispatch} = useContext(NotificationsContext)

	const newAnecdoteMutation = useMutation({
		mutationFn: createAnecdote,
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
			showNotification(
				notificationsDispatch, 
				`Added anecdote: ${newAnecdote.content}`
			)
		},
		onError: (error) => {
			showNotification(
				notificationsDispatch, 
				`Anecdote is too short - must have >=5 characters`
			)
		}
	})

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

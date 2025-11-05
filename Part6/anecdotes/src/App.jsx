import Notification from './components/Notification'
import Filter from './components/Filter'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

import noteService from './services/anecdotes'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {set} from './reducers/anecdoteReducer'

const App = () => {

	const dispatch = useDispatch()

	useEffect(() => {
		noteService.getAll().then(allAnecdotes=>{dispatch(set(allAnecdotes))})
	},[dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
			<Notification/>
			<Filter/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App

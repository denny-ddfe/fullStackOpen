import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const voteReducer = (state, action) => {
	return state.map((anecdote) => {
		return anecdote.id===action.payload.id?
			action.payload:
			anecdote
	})
}

const createReducer = (state, action) => {
	return state.concat(action.payload)
}

const setReducer = (state, action) => action.payload

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		vote: voteReducer,
		create: createReducer,
		set: setReducer
	}
})

const {set, create, vote} = anecdoteSlice.actions

export const initialiseAnecdotes = () => {
	return async (dispatch) => {
		const allAnecdotes = await anecdoteService.getAll()
		dispatch(set(allAnecdotes))
	}
}

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch(create(newAnecdote))
	}
}

export const voteForAnecdote = (anecdote) => {
	return async (dispatch) => {
		const editedAnecdote = await anecdoteService.voteFor(anecdote)
		dispatch(vote(editedAnecdote))
	}
}

export default anecdoteSlice.reducer

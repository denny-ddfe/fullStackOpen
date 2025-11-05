import { createSlice } from "@reduxjs/toolkit"
//import { current } from '@reduxjs/toolkit'

const voteReducer = (state, action) => {
	return state.map((anecdote) => {
		return anecdote.id===action.payload?
			{...anecdote, votes:anecdote.votes+1}:
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

export const {vote, create, set} = anecdoteSlice.actions
export default anecdoteSlice.reducer

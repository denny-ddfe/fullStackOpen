import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const createReducer = (state, action) => {
	return state.concat({...action.payload, timestamp: Date.now()})
}

const removeReducer = (state) => {
	state.shift()
}

const notifsSlice = createSlice({
	name: 'notifs',
	initialState,
	reducers: {
		create: createReducer,
		remove: removeReducer
	}
})

const { create, remove } = notifsSlice.actions

export const showNotif = (notif) => {
	return (dispatch) => {
		dispatch(create(notif))
		setTimeout(() => {
			dispatch(remove(null))
		}, 5000)
	}
}

export default notifsSlice.reducer
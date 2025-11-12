import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'
import { showNotif } from './notifsReducer'

const setReducer = (state, action) => {
	return action.payload
}

const removeReducer = (state) => {
	return null
}

const userSlice = createSlice({
	name: 'user',
	initialState: null,
	reducers: {
		set: setReducer,
		remove: removeReducer
	}
})

const { set: setUser, remove } = userSlice.actions

export const login = ({username, password}) => {
	return async (dispatch) => {
		try {
			const loginAttempt = await loginService.login({ username, password })
			dispatch(setUser(loginAttempt))
			window.localStorage.setItem('cachedUser', JSON.stringify(loginAttempt))
		} catch {
			dispatch(showNotif({msg:'Login failed', type:'error'}))
		}
	}
}

export const logout = () => {
	return (dispatch) => {
		dispatch(remove())
		window.localStorage.setItem('cachedUser', '')
	}
}

export {setUser}
export default userSlice.reducer
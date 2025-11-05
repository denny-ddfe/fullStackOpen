import { createSlice } from "@reduxjs/toolkit"
//import { current } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
	name:'notification',
	initialState: [],
	reducers: {
		add(state, action) {
			const newNotif = {
				content: action.payload,
				timestamp: new Date().toString()
			}
			return state.concat(newNotif)
		},
		remove(state) {
			state.shift()
		}
	}
})

const {add, remove} = notificationSlice.actions

export const showNotification = (content, duration) => {
	return (dispatch) => {
		dispatch(add(content))
		setTimeout(() => {
			dispatch(remove(null))
		}, duration*1000)
	}
}

export default notificationSlice.reducer
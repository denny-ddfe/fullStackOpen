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

export const {add, remove} = notificationSlice.actions
export default notificationSlice.reducer
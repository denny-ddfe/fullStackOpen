import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
	name:'notification',
	initialState: '',
	reducers: {
		change(state, action) {
			return action.payload
		}
	}
})

export const {change} = notificationSlice.actions
export default notificationSlice.reducer
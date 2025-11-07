export const showNotification = (dispatch, content) => {

	dispatch({
		type:'ADD', 
		payload:{content, timestamp:Date.now()}
	})

	setTimeout(() => {
		dispatch({type:'REMOVE'})
	}, 5000)
}
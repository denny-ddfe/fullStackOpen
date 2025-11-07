import { createContext, useReducer } from 'react'

const notificationsReducer = (state, action) => {
	
	switch (action.type) {
		case 'ADD':
			return state.concat(action.payload)
		case 'REMOVE':
			return state.filter((notif, index) => {
				return index !== 0
			})

	}
}

const NotificationsContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notifications, notificationsDispatch] = useReducer(notificationsReducer, [])

  return (
    <NotificationsContext.Provider value={{ notifications, notificationsDispatch }}>
      {props.children}
    </NotificationsContext.Provider>
  )
}

export default NotificationsContext
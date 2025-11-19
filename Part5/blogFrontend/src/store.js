import { configureStore } from '@reduxjs/toolkit'

import notifReducer from './reducers/notifsReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    notifs: notifReducer,
		user: userReducer
  }
})

export default store
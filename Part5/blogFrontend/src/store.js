import { configureStore } from '@reduxjs/toolkit'

import notifReducer from './reducers/notifsReducer'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    notifs: notifReducer,
		blogs: blogsReducer,
		user: userReducer
  }
})

export default store
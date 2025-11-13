import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Login from './components/Login'
import Notifications from './components/Notifications'
import PageContent from './components/PageContent'

import { setUser } from './reducers/userReducer'
import { setBlogs } from './reducers/blogsReducer'

import './index.css'

const App = () => {

	useEffect(() => {
		//get blogs from DB
		dispatch(setBlogs())
	}, [])

	const user = useSelector(state=>state.user)
	const dispatch = useDispatch()

  useEffect(() => {
    //get user from local storage
    const cachedUserJSON = window.localStorage.getItem('cachedUser')
    if (cachedUserJSON) {
			const cachedUser = JSON.parse(cachedUserJSON)
			dispatch(setUser(cachedUser))
		}
  }, [])

//##############################################################################

  //page content
  return (
    <>
      {user && <h2>blogs</h2>}
			<Notifications/>
			<Login/>
			<PageContent/>
    </>
  )
}

export default App 
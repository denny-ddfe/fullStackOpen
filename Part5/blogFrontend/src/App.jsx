import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Container, Alert } from '@mui/material'

import {
  Routes, Route
} from 'react-router-dom'

import Login from './components/Login'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import User from './components/User'
import UserList from './components/UserList'
import ProtectedRoutes from './components/ProtectedRoutes'
import Notifications from './components/Notifications'

import { setUser } from './reducers/userReducer'

import './index.css'


const App = () => {

	const [isLoading, setLoading] = useState(true)

	const user = useSelector(state=>state.user)
	const notifs = useSelector(state=>state.notifs)
	
	const dispatch = useDispatch()

  useEffect(() => {
    //get user from local storage
    const cachedUserJSON = window.localStorage.getItem('cachedUser')
    if (cachedUserJSON) {
			const cachedUser = JSON.parse(cachedUserJSON)
			dispatch(setUser(cachedUser))
		}
		setLoading(false)
  }, [])

//##############################################################################

	if (isLoading) {
		return <>Loading...</>
	}

  //page content
  return (
		<Container>
			<Routes>

				<Route path='/login' element={<Login isLogin={true}/>} />
				<Route path='/createuser' element={<Login isLogin={false}/>} />

				<Route element={<ProtectedRoutes {...{user}}/>} >
					<Route path='/' element={<BlogList/>} />
					<Route path='/blogs/:id' element={<Blog />} />
					<Route path='/users/:id' element={<User />} />
					<Route path='createblog' element={<BlogForm/>} />
					<Route path='users' element={<UserList/>} />
				</Route>

			</Routes>

			<Notifications/>

		</Container>
  )
}
//message={notifs.map(notif=>notif.msg).join('\n')}
export default App 
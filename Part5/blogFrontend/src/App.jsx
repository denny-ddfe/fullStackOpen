import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  Routes, Route
} from 'react-router-dom'

import Login from './components/Login'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import UserList from './components/UserList'
import ProtectedRoutes from './components/ProtectedRoutes'

import { setUser } from './reducers/userReducer'
import { setBlogs } from './reducers/blogsReducer'

import './index.css'


const App = () => {

	const [isLoading, setLoading] = useState(true)

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
		setLoading(false)
  }, [])

//##############################################################################

	if (isLoading) {
		return <>Loading...</>
	}

  //page content
  return (
		<>
			<Routes>

				<Route path='/login' element={<Login isLogin={true}/>} />
				<Route path='/createuser' element={<Login isLogin={false}/>} />

				<Route element={<ProtectedRoutes {...{user}}/>} >
					<Route path='/' element={<BlogList/>} />
					<Route path='/blogs/:id' element={<Blog />} />
					<Route path='createblog' element={<BlogForm/>} />
					<Route path='users' element={<UserList/>} />
				</Route>

			</Routes>
		</>
  )
}

export default App 
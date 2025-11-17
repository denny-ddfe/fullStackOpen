import { useRef } from 'react'
import {login} from '../reducers/userReducer'
import { showNotif } from '../reducers/notifsReducer'
import { useDispatch, useSelector } from 'react-redux'

import { Navigate, Link } from 'react-router-dom'

import Notifications from './Notifications'

import userService from '../services/users'

const Login = ({isLogin}) => {

	const formRef = useRef()
	const dispatch = useDispatch()
	const user = useSelector(state=>state.user)

	// if (user) {
	// 	return (
	// 		<div>
  //       {user.name} logged in
  //       <button onClick={() => {dispatch(logout())}}>log out</button>
  //     </div>
	// 	)
	// }

	if (user) {
		return <Navigate replace to="/"/>
	}

	

	return (
		<>
			<Notifications/>
			<h2>Login</h2>

			{/* <button onClick={()=>{
				setFormType(formType==='login'?'create':'login')
			}}>
				{formType==='login'?'create user':'login'}
			</button> */}

			<Link to={isLogin?'/createuser':'/login'}>
				{isLogin?
				'No account? Create one here':
				'Already have an account? Log in here'}
			</Link>

			<form
				ref={formRef}
				onSubmit={async (e)=>{
					const form = formRef.current
					e.preventDefault()

					const username = form.username.value
					const password = form.password.value
					const serverPass = form.serverPass?.value

					if (!isLogin) {
						try {
							const newUser =  await userService.create({
								username, 
								name: username,
								password, 
								serverPass
							})
						} catch (error) {
							console.log(error)
							
							dispatch(showNotif({
								msg:error.response.data.error||error.msg, 
								type:'error'
							}))
							return
						}
						
					}

					dispatch(login({username, password}))
				}}
			>
				<label htmlFor='username'>username</label>
				<input type='text' name='username' id='username'></input><br></br>
				<label htmlFor='password'>password</label>
				<input type='password' name='password' id='password'></input><br></br>
				
				{isLogin?
					null:
					<>
						<label htmlFor='password'>Server Password</label>
						<input type='password' name='serverPass' id='serverPass'></input><br></br>
					</>
				}
				<button type="submit">{isLogin?'Login':'Create user'}</button>
			</form>
		</>
	)
}

export default Login
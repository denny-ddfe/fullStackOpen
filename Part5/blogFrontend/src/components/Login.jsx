import { useRef } from 'react'
import {login, logout} from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {

	const formRef = useRef()
	const dispatch = useDispatch()
	const user = useSelector(state=>state.user)

	if (user) {
		return (
			<div>
        {user.name} logged in
        <button onClick={() => {dispatch(logout())}}>log out</button>
      </div>
		)
	}

	return (
		<form
			ref={formRef}
			onSubmit={(e)=>{
				const form = formRef.current
				e.preventDefault()
				const username = form.username.value
				const password = form.password.value
				dispatch(login({username, password}))
			}}
		>
			<label htmlFor='username'>username</label>
			<input type='text' name='username' id='username'></input><br></br>
			<label htmlFor='password'>password</label>
			<input type='password' name='password' id='password'></input><br></br>
			<button type="submit">Login</button>
		</form>
	)
}

export default Login
import { useState } from 'react'
import StateInput from './StateInput'
import loginService from '../services/login'

const Login = ({ user, setUser, setNotif }) => {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	//add cached user and log in
	const handleLogin = async () => {

		try {
			const loginAttempt = await loginService.login({ username, password })
			setUser(loginAttempt)
			window.localStorage.setItem('cachedUser', JSON.stringify(loginAttempt))
			setUsername('')
			setPassword('')
		} catch {
			setNotif({msg:'Login failed', type:'error'})
		}
	}

	//remove cached user and log out
  const handleLogout = () => {
    window.localStorage.setItem('cachedUser', '')
    setUser(null)
  }

	if (user) {
		return (
			<div>
        {user.name} logged in
        <button onClick={handleLogout}>log out</button>
      </div>
		)
	}

	return (
		<form>
			<StateInput params={
				{
					caption:'username', 
					value:username, updateFunc:setUsername
				}
			}/>
			<StateInput params={
				{
					caption:'password', type:'password', 
					value:password, updateFunc:setPassword
				}
			}/>
			<button
				type="submit"
				onClick={(e)=>{
					e.preventDefault()
					handleLogin()
				}}
			>Login
			</button>
		</form>
	)
}

export default Login
import { useState, useEffect } from 'react'
import Login from './components/Login'
import Notification from './components/Notification'
import PageContent from './components/PageContent'
import blogService from './services/blogs'
import './index.css'

const App = () => {
  const [user, setUser] = useState(null)
	const [notif, setNotif] = useState({msg:null, type:'error'})

  useEffect(() => {
    //get user from local storage
    const cachedUserJSON = window.localStorage.getItem('cachedUser')
    if (cachedUserJSON) {
			const cachedUser = JSON.parse(cachedUserJSON)
			setUser(cachedUser)
		}
  }, [])

	//when user updates, set token in blog service
	useEffect(()=> {
		blogService.setToken(user?.token || '')
	}, [user])

	//when notif updates, hide it after 5s
	useEffect (() => {
		setTimeout(() => {setNotif(null)}, 5000)
	}, [notif])

//##############################################################################

  //page content
  return (
    <>
      {user && <h2>blogs</h2>}
			<Notification content={notif}/>
			<Login {...{ user, setUser, setNotif }}/>
			<PageContent {...{user, setNotif}}/>
    </>
  )
}

export default App 
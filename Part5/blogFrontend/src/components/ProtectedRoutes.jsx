import { Navigate, Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { useSelector } from 'react-redux'

const ProtectedRoutes = () => {

	const user = useSelector(state=>state.user)

	if (!user) {return <Navigate to='/login'/>}

	return <>
		<Navbar/>
		<Outlet/>
	</>
	
}

export default ProtectedRoutes
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../reducers/userReducer"
import { Link } from "react-router-dom"

const Navbar = () => {

	const dispatch = useDispatch()

	const user = useSelector(state=>state.user)

	const padding = {
    padding: 10
  }

	return <div>
		<Link style={padding} to={''}>View blogs</Link>
		<Link style={padding} to={'createblog'}>Create new</Link>
		<Link style={padding} to={'users'}>View users</Link>
		{user.name} logged in
		<button onClick={() => {dispatch(logout())}}>log out</button>
	</div>

}

export default Navbar
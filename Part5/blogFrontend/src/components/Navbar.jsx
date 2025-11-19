import { useSelector, useDispatch } from "react-redux"
import { logout } from "../reducers/userReducer"
import { Link } from "react-router-dom"
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material"

const Navbar = () => {

	const dispatch = useDispatch()

	const user = useSelector(state=>state.user)

	return <AppBar position="static"><Toolbar>

		<Box>
		<Button color="inherit" component={Link} to={''}>
			View Blogs
		</Button>
		<Button color="inherit" component={Link} to={'users'}>
			View users
		</Button>
		</Box>

		<Box sx={{ display: "flex", ml: "auto", alignItems:"center" }}>
		<Typography variant="body2">{user.name} logged in</Typography>
		<Button 
			color="inherit" 
			onClick={() => {dispatch(logout())}}
		>
			log out
		</Button>
		</Box>

</Toolbar></AppBar>

}

export default Navbar
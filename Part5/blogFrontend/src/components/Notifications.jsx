import { Snackbar, Typography } from "@mui/material"
import { useSelector } from "react-redux"

const Notifications = () => {

	const notifs = useSelector(state=>state.notifs)

	const containerStyle = {
		border:'1px solid black', 
		padding:'4px',
		backgroundColor:'#dddddd'
	}

	return <Snackbar open={notifs.length>0}>
		<div style={containerStyle}>
			{notifs.map(notif=>{
				return <Typography 
					className={notif.type} 
					key={notif.timestamp}
				>
					{notif.msg}
				</Typography>
			})}
		</div>
	</Snackbar>

}

export default Notifications

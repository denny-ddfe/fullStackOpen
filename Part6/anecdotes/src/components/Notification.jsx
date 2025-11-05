import { useSelector } from "react-redux"

const Notification = () => {

	const notifs = useSelector(({notifications}) => {
		return notifications
	})

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

	if (notifs.length===0) {
		return null
	}

  return <div style={style}>
		{notifs.map((notif)=>{
			return <div key={notif.timestamp}>{notif.content}</div>
		})}
	</div>
}

export default Notification

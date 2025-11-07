import { useContext } from 'react'
import NotificationsContext from "../contexts/NotificationsContext"

const Notification = () => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

	const {notifications} = useContext(NotificationsContext)
  
  if (notifications.length===0) return null

  return (
    <div style={style}>
      {notifications.map((notification) => {
				return <div key={notification.timestamp}>{notification.content}</div>
			})}
    </div>
  )
}

export default Notification

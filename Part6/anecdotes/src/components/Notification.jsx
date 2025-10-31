import { useSelector } from "react-redux"

const Notification = () => {

	const notif = useSelector(({notification}) => {
		return notification
	})

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

	if (!notif) {
		return null
	}

  return <div style={style}>
		{notif}
	</div>
}

export default Notification

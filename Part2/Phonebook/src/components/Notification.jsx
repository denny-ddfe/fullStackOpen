const Notification = ({obj}) => {

  if (obj === null) {
    return null
  }

	const {msg, type} = obj

  return (
    <div className={`${type} notif`}>
      {msg}
    </div>
  )
}

export default Notification
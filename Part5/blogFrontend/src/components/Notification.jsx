const Notification = ({ content }) => {

	if (!content) {return null}

	return <div className={'notif ' + content.type}>
		{content.msg}
	</div>
}

export default Notification
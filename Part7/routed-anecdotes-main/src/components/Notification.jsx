const Notification = ({ notification }) => {

	if (!notification) {return null}
	return <div style={{marginTop: '10px'}}>
		<span style={{
			border:'2px solid red', 
			height:'1em', 
			padding: '3px',
		}}>{notification}</span>
	</div>
}

export default Notification
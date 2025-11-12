import { useSelector } from 'react-redux'

const Notifications = () => {

	const content = useSelector(state=>state.notifs)

	if (content.length===0) {return null}

	return <div className='notif'>
		{content.map((notif)=>{
			return <div key={notif.timestamp} className={notif.type}>
				{notif.msg}
			</div>
		})}
		
	</div>
}

export default Notifications
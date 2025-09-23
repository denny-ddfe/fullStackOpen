const Filter = ({value, updateFunc}) => {
	return <div>
		filter shown with:{' '}
		<input 
			value={value} 
			onChange={(event)=>updateFunc(event.target.value)}
		/>
	</div>
}




export default Filter
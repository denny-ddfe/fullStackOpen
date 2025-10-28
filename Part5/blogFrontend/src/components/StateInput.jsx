const StateInput = ({ params }) => (
	<div>
		<label>
			{params.caption}
			<input 
				type={params.type || 'text'}
				value={params.value} 
				onChange={e => params.updateFunc(e.target.value)} 
				required
			/>
		</label>
	</div>
)

export default StateInput
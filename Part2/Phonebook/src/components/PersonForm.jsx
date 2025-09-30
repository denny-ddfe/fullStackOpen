const PersonForm = ({nameRef, numRef, handleSubmit}) => {
	return <>
	<form>
		name: <input ref={nameRef} placeholder='new name...'/><br></br>
		number: <input ref={numRef} placeholder='new number...'/><br></br>
		<div>
			<button type="submit" onClick={handleSubmit}>add</button>
		</div>
	</form>
	</>
}

export default PersonForm
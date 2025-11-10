import { useNavigate } from "react-router-dom"
import useField from "../hooks/useField"

const inputField = (props) => {

	const {caption, reset: _reset, ...inputParams} = props

	return <div>
		{caption}
		<input 
			{...inputParams}
		/>
	</div>
}

const CreateNew = (props) => {
	const navigate = useNavigate()

	const contentField = useField('content', 'text')
	const authorField = useField('author', 'text')
	const infoField = useField('info', 'text', 'url for more info')

	const resetAll = () => {
		contentField.reset()
		authorField.reset()
		infoField.reset()
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		props.addNew({
			content: contentField.value,
			author: authorField.value,
			info: infoField.value,
			votes: 0
		})
		contentField.reset()
		authorField.reset()
		infoField.reset()
		navigate('/')
		props.showNotification(`Added new anecdote: ${contentField.value}`)
	}

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				{inputField(contentField)}
				{inputField(authorField)}
				{inputField(infoField)}
				<button>create</button>
				<button type="button" onClick={resetAll}>reset</button>
			</form>
		</div>
	)

}

export default CreateNew
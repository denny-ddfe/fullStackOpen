import { useState, useRef } from 'react'
import StateInput from './StateInput'

const CreateBlog = ({handleCreate}) => {

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
	const formRef = useRef(null)

	return (
		<>
		<h2>create new</h2>
		<form ref={formRef}>
			<StateInput params={
				{caption:'title', value: title, updateFunc:setTitle}
			}/>
			<StateInput params={
				{caption:'author', value: author, updateFunc:setAuthor}
			}/>
			<StateInput params={
				{caption:'url', type:'url', value: url, updateFunc:setUrl}
			}/>
			<button 
				type='submit' 
				onClick={(e)=>{
					
					e.preventDefault()
					const form = formRef.current;
					if (!form.checkValidity()) {
						form.reportValidity();
						return;
					}
					handleCreate({title, author, url})
				}}
			>create</button>
		</form>
		</>
	)
}

export default CreateBlog
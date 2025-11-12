import { useRef } from 'react'

import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'


const BlogForm = () => {

	const dispatch = useDispatch()
	const formRef = useRef(null)

	return (
		<><h2>create new</h2>
		<form 
			ref={formRef} 
			onSubmit={(e)=>{
				e.preventDefault()
				const form = formRef.current;
				if (!form.checkValidity()) {
					form.reportValidity();
					return;
				}
				const title = form.title.value
				const author = form.author.value
				const url = form.url.value
				dispatch(createBlog({title, author, url}))
			}}>
			<label htmlFor='title'>title</label>
			<input type='text' name='title' id='title'></input><br></br>
			<label htmlFor='author'>author</label>
			<input type='text' name='author' id='author'></input><br></br>
			<label htmlFor='url'>url</label>
			<input type='url' name='url' id='url'></input><br></br>
			<button 
				type='submit' 
			>create</button>
		</form>
		</>
	)
}

export default BlogForm
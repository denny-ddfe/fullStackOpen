import { useRef } from 'react'
import { useBlogs } from '../hooks/useBlogs'

import { TextField, Button, Stack, Typography } from '@mui/material';
import PageHeader from './PageHeader';

const BlogForm = () => {

	const formRef = useRef(null)
	const {addBlogMutation} = useBlogs()

	const textFieldProps = (caption) => {
		return {
			required: true,
			label: caption,
			name: caption.toLowerCase(),
			id: caption.toLowerCase(),
			size: 'small'
		}
	}

	return (
		<>
			<PageHeader caption='Create New'/>
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
					addBlogMutation.mutate({title, author, url})
			}}>
				<Stack 
					spacing={2} 
					sx={{ 
						width: "60%", 
						marginTop: '2em',
						marginLeft: 'auto',
						marginRight: 'auto'
					}}
					>
				
				<TextField {...{...textFieldProps('Title'), type:'text'}}	/>
				<TextField {...{...textFieldProps('Author'), type:'text'}}/>
				<TextField {...{...textFieldProps('URL'), type:'url'}}/>
				<Button 
					variant='contained'
					type='submit' 
				>create</Button>
				</Stack>
				
			</form>
		</>
	)
}

export default BlogForm
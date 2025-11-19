import { useBlogs } from "../hooks/useBlogs"
import { useMatch } from "react-router-dom"
import { useSelector } from "react-redux"
import { useRef, useEffect } from "react"
import { 
	Button,
	Stack,
	Box,
	Typography,
	List,
	ListItem,
	ListItemText,
	TextField
} from "@mui/material"

import PageHeader from './PageHeader'
import InfoTable from "./BlogParts/InfoTable"

const Blog = () => {

	const {
		blogsQuery, 
		likeBlogMutation, 
		removeBlogMutation, 
		addCommentMutation
	} = useBlogs()
	const match = useMatch('/blogs/:id')
	const user = useSelector(state=>state.user)
	const formRef = useRef(null)

	useEffect(() => {
		if(addCommentMutation.isSuccess) {
			formRef.current.reset()
		}
	}, [addCommentMutation.isSuccess])

	if (blogsQuery.isLoading) {return <p>Loading...</p>}
	if (blogsQuery.isError) {return <p>Failed to load blogs.</p>}

	const blog = blogsQuery.data.find((blog) => blog.id===match.params.id)

  return <>
		{/*Header and control buttons  ########################################*/}
		<Stack 
			direction="row" 
			spacing={2} 
			alignItems="center"
			sx={{marginTop:'10px', marginBottom:'30px'}}
		>
				
			{/* Page header  ----------------------------------------------------*/}
			<PageHeader caption={`${blog.title} by ${blog.author}`} />

			{/* Spacer */}
				<Box sx={{ flexGrow: 1 }} /> 

			{/* Remove button ---------------------------------------------------*/}
			{user.username === blog.user.username && (
				<Button
					size="small"
					color="error"
					variant="contained"
					onClick={() => {
						if (window.confirm(`Remove ${blog.title}?`)) {
							removeBlogMutation.mutate(blog);
						}
					}}
				>
					remove
				</Button>
			)}

			{/* Like button  ----------------------------------------------------*/}
			<Button
				variant="contained"
				size="small"
				onClick={() => likeBlogMutation.mutate(blog)}
			>
				like
			</Button>

		</Stack>

		{/*Page content  ######################################################*/}

		<Stack direction="row" spacing={2}>
			
			{/* Info table  -----------------------------------------------------*/}
			<Box width='40%'>
				<Typography variant="h6">Blog Information</Typography>
				<InfoTable {...{blog}}/>
			</Box>
			
			{/* Comments list  --------------------------------------------------*/}
			<Box sx={{flexGrow:1, maxWidth:'60%'}}>

				<Typography variant="h6">Comments</Typography>
				<List>
					{blog.comments.map((comment) => {
						return <ListItem key={comment.id}><ListItemText>
							{comment.text}
						</ListItemText></ListItem>
					})}
				</List>

				{/* New comment form  -----------------------------------------------*/}
				<form 
					ref={formRef}
					onSubmit={async (e) => {
						e.preventDefault()
						const form = formRef.current
						addCommentMutation.mutate({comment:{text:form.content.value}, blog})
						
					}}
				>
					<TextField 
						required 
						id="content" 
						label='Post a comment...'
						type="text"
						name="content"
						size="small"
						sx={{width:'80%', marginRight:'5px'}}
						/>
					<Button  type='submit'>create</Button>
				</form>

			</Box>
		</Stack>
	</>
}

export default Blog
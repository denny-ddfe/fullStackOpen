
import { 
	TableContainer, 
	Table, 
	TableBody, 
	TableRow, 
	TableCell,
	TableHead,
	Button,
	Stack
} from '@mui/material'
import { useBlogs } from '../hooks/useBlogs'

import { Link, useNavigate } from 'react-router-dom'
import PageHeader from './PageHeader'

const BlogList = () => {

	const {blogsQuery} = useBlogs() 
	const navigate = useNavigate()

	if (blogsQuery.isLoading) {return <p>Loading...</p>}
	if (blogsQuery.isError) {return <p>Failed to load blogs.</p>}
	
  const blogStyle = {
    paddingTop: 5,
		paddingBottom: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

	//page content
	return (
	<>
		<PageHeader caption='Blogs'/>
		
		<Stack sx={{width:'60%', marginLeft: 'auto', marginRight: 'auto'}}>

		<TableContainer>
			<Table >

				<TableHead><TableRow>
					<TableCell width={'80%'}>Title</TableCell>
					<TableCell>Author</TableCell>
				</TableRow></TableHead>

				<TableBody>
					{blogsQuery.data.sort((a,b)=>b.likes-a.likes).map(blog => {
						return <TableRow key={blog.id}> 
							<TableCell>
								<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
							</TableCell>
							<TableCell>{blog.author}</TableCell>
						</TableRow>
					})}
				</TableBody>

			</Table>
		</TableContainer>

		<Button 
			variant='contained'
		onClick={() => {navigate('/createblog')}}>create new</Button>
		</Stack>			
	</>
)}

export default BlogList
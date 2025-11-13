
import Blog from './Blog'
import BlogForm from './BlogForm'
import Toggleable from './Toggleable'

import { useSelector } from 'react-redux'
import { useBlogs } from '../hooks/useBlogs'

const PageContent = () => {

	const user = useSelector(state=>state.user)

	const {blogsQuery} = useBlogs()

	//user not logged in? No content for you
	if (!user) {
		return null
	}

	if (blogsQuery.isLoading) {return <p>Loading...</p>}
	if (blogsQuery.isError) {return <p>Failed to load blogs.</p>}
	
	//page content
	return (
	<>
		{/*create blog control with toggle button*/}
		<Toggleable buttonLabel='create new' hideLabel='cancel create'>
			<BlogForm/>
		</Toggleable>
		{/*blog list. Sorted and mapped to blog component*/}
		{blogsQuery.data.sort((a,b)=>b.likes-a.likes).map(blog => {
			
			return <Blog 
				key={blog.id} 
				blog={blog} 
				showDelete={blog.user.username === (user?.username || '')}
			/>

		})}
	</>
)}

export default PageContent
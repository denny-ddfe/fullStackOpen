import Blog from './Blog'
import BlogForm from './BlogForm'
import Toggleable from './Toggleable'

import { useSelector } from 'react-redux'

const PageContent = ({ user }) => {


	const blogs = useSelector(state=>[...state.blogs].sort((a,b)=>b.likes-a.likes))


	
	//user not logged in? No content for you
	if (!user) {
		return null
	}
	
	//page content
	return (
	<>
		{/*create blog control with toggle button*/}
		<Toggleable buttonLabel='create new' hideLabel='cancel create'>
			<BlogForm/>
		</Toggleable>
		{/*blog list. Sorted and mapped to blog component*/}
		{blogs.map(blog => {
			
			return <Blog 
				key={blog.id} 
				blog={blog} 
				showDelete={blog.user.username === (user?.username || '')}
			/>

		})}
	</>
)}

export default PageContent
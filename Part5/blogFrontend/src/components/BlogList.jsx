
import Blog from './Blog'
import { useBlogs } from '../hooks/useBlogs'

import { Link } from 'react-router-dom'

const BlogList = () => {

	const {blogsQuery} = useBlogs()

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
		<h2>Blogs</h2>
		{blogsQuery.data.sort((a,b)=>b.likes-a.likes).map(blog => {
			
			return <div style={blogStyle} key={blog.id}><Link to={`/blogs/${blog.id}`}>
				{blog.title}
			</Link></div>
			// return <Blog 
			// 	key={blog.id} 
			// 	blog={blog} 
			// 	showDelete={blog.user.username === (user?.username || '')}
			// />

		})}
	</>
)}

export default BlogList
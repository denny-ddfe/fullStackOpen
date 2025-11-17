import { useBlogs } from "../hooks/useBlogs"
import { useMatch } from "react-router-dom"
import { useSelector } from "react-redux"

const Blog = () => {

	const user = useSelector(state=>state.user)

	const {blogsQuery, likeBlogMutation, removeBlogMutation} = useBlogs()

	const match = useMatch('/blogs/:id')
	
	if (blogsQuery.isLoading) {return <p>Loading...</p>}
	if (blogsQuery.isError) {return <p>Failed to load blogs.</p>}

	const blog = blogsQuery.data.find((blog) => blog.id===match.params.id)

  return (
		<>
      <h2>{blog.title} by {blog.author}</h2>
        <br></br>
        <span className="blogUrl">url: {blog.url}</span>
        <br></br>
        <span className='blogLikes'>likes: {blog.likes}</span><button
          onClick={()=>{
            likeBlogMutation.mutate(blog)
          }
        }>like</button>
        <br></br>
        <span className="blogContributor">added by {blog.user.name}</span>
      {user.username===blog.user.username && <button onClick={()=>{
				if (window.confirm(`Remove ${blog.title}?`)) {
					removeBlogMutation.mutate(blog)
				}
      }}>remove</button>}
		</>
  )
}

export default Blog
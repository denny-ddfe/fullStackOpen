import Blog from './Blog'
import CreateBlog from './CreateBlog'
import blogService from '../services/blogs'
import Toggleable from './Toggleable'

import { useState, useEffect } from 'react'

const PageContent = ({ user, setNotif }) => {
	
	const [blogs, setBlogs] = useState([])

	useEffect(() => {
		//get blogs from DB
		blogService.getAll().then(blogs => {
			setBlogs(blogs) 
		})
	}, [])

//##############################################################################

	//handle creation of a blog
	const createBlog = async (blogToCreate) => {
		try {
			const newBlog = await blogService.create(blogToCreate)
			setBlogs(blogs.concat(newBlog))
			setNotif({
				msg:`new blog added: ${newBlog.title} by ${newBlog.author}`,
				type:'success'
			})
		} catch(err) {
			setNotif({msg:err.response.data.error, type:'error'})
		}
	}
	
//##############################################################################
	
	//handle liking of a blog
	const likeBlog = async (blogToLike) => {

		try {
			const updatedBlog = await blogService.like(blogToLike)
			setBlogs(blogs.map((blog)=>{
				return blog.id===updatedBlog.id?
					updatedBlog:
					blog
			}))
			//no need to notify for a like
		} catch(err) {
			setNotif({msg:err.response.data.error, type:'error'})
		}

	}
	
//##############################################################################
	
	//hand removal of a blog
	const removeBlog = async (blogToRemove) => {

		if (!window.confirm(`Delete ${blogToRemove.title}?`)) {
			return
		}

		try {
			await blogService.remove(blogToRemove)
			setBlogs(blogs.filter((blog)=>{
				return blog.id!==blogToRemove.id
			}))
			setNotif({
				msg:`blog removed: ${blogToRemove.title} by ${blogToRemove.author}`,
				type:'success'
			})
		} catch(err) {
			setNotif({msg:err.response.data.error, type:'error'})
		}
	}

//##############################################################################	
	
	//user not logged in? No content for you
	if (!user) {
		return null
	}
	
	//page content
	return (
	<>
		{/*create blog control with toggle button*/}
		<Toggleable buttonLabel='create new' hideLabel='cancel create'>
			<CreateBlog handleCreate={createBlog}/>
		</Toggleable>
		{/*blog list. Sorted and mapped to blog component*/}
		{blogs.sort((a,b)=>b.likes-a.likes).map(blog => {
			
			return <Blog 
				key={blog.id} 
				blog={blog} 
				like={likeBlog}
				remove={removeBlog}
				showDelete={blog.user.username === (user?.username || '')}
			/>
		})}
	</>
)}

export default PageContent
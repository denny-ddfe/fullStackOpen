import { createSlice } from '@reduxjs/toolkit'
import { showNotif } from './notifsReducer'
import blogService from '../services/blogs'

const initialState = []

const createReducer = (state, action) => {
	return state.concat({...action.payload})
}

const removeReducer = (state, action) => {
	return state.filter(blog=>{
		return blog.id!==action.payload.id
	})
}

const likeReducer = (state, action) => {
	return state.map(blog=>{
		return blog.id===action.payload.id?
			{...blog, likes: blog.likes+1}:
			blog
	})
}

const setReducer = (state, action) => {
	return action.payload
}

const blogsSlice = createSlice({
	name: 'blogs',
	initialState,
	reducers: {
		create: createReducer,
		remove: removeReducer,
		like: 	likeReducer,
		set:		setReducer
	}
})

const { create, remove, like, set } = blogsSlice.actions

const createCRUDThunk = (
	dbMutator,
	reduxMutator,
	resource,
	msg
) => {
	return async (dispatch, getState) => {
		const rawToken = getState().user?.token
		const token = rawToken?`Bearer ${rawToken}`:null
		try {
			const response = await dbMutator(resource, token)
			dispatch(reduxMutator(response))
			if (msg) {
				dispatch(showNotif({msg, type: 'success'}))
			}
		} catch(err) {
			dispatch(showNotif({
				msg: err.response.data.error || err.message,
				type: 'error'
			}))
		}
	}
}

export const createBlog = (blogToCreate) => {
	return createCRUDThunk(
		blogService.create, 
		create,
		blogToCreate,
		`new blog added: ${blogToCreate.title} by ${blogToCreate.author}`
	)
}

export const removeBlog = (blogToRemove) => {
	return createCRUDThunk(
		blogService.remove,
		remove,
		blogToRemove,
		`blog deleted: ${blogToRemove.title} by ${blogToRemove.author}`
	)
}

export const likeBlog = (blogToLike) => {
	return createCRUDThunk(
		blogService.like,
		like,
		blogToLike,
		`You liked ${blogToLike.title}`
	)
}

export const setBlogs = () => {
	return createCRUDThunk(
		blogService.getAll,
		set
	)
}

export default blogsSlice.reducer
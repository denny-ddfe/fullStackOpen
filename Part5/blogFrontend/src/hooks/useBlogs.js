import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { showNotif } from '../reducers/notifsReducer';

import blogService from '../services/blogs'

export const useBlogs = () => {

	//hooks
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const token = useSelector((state) => `Bearer ${state.user?.token}`)
	const dispatch = useDispatch()

	//get data
	const blogsQuery = useQuery({
		queryKey: ['blogs'],
		queryFn: blogService.getAll
	})

	//
	const blogMutationSuccess = (msg) => {
		queryClient.invalidateQueries(['blogs'])
		dispatch(showNotif({msg,type:'success'}))
	}

	const addBlogMutation = useMutation({
		mutationFn: (blogToCreate) => blogService.create(blogToCreate, token),
		onSuccess: (createdBlog) => {
			blogMutationSuccess(`created new blog: ${createdBlog.title}`)
			navigate('/')
		},
		onError: (err) => {
			dispatch(showNotif({msg: err.response.data.error, type: 'error'}))
		}
	})

	const likeBlogMutation = useMutation({
		mutationFn: (blogToLike) => blogService.like(blogToLike, token),
		onSuccess: (likedBlog) => {
			blogMutationSuccess(`you liked: ${likedBlog.title}`)
		},
		onError: (err) => { 
			dispatch(showNotif({msg: err.response.data.error || err.message, type: 'error'}))
		}
	})

	const removeBlogMutation = useMutation({
		mutationFn: (blogToRemove) => blogService.remove(blogToRemove, token),
		onSuccess: (deletedBlog) => {
			blogMutationSuccess(`blog deleted: ${deletedBlog.title}`)
			blogService.deleteComments(deletedBlog)
			navigate('/')
		}
	})

	const addCommentMutation = useMutation({
		mutationFn:({comment, blog}) => blogService.createComment(comment, blog, token),
		onSuccess: (newComment) => {
			queryClient.invalidateQueries(['blogs'])
		}
	})

	return {
		blogsQuery, 
		addBlogMutation, 
		likeBlogMutation, 
		removeBlogMutation, 
		addCommentMutation
	}

}

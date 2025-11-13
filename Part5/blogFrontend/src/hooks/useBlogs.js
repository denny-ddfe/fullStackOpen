import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { useSelector, useDispatch } from 'react-redux';
import { showNotif } from '../reducers/notifsReducer';

import blogService from '../services/blogs'

export const useBlogs = () => {

	const queryClient = useQueryClient()
	const token = useSelector((state) => `Bearer ${state.user?.token}`)
	const dispatch = useDispatch()

	const blogsQuery = useQuery({
		queryKey: ['blogs'],
		queryFn: blogService.getAll
	})

	const blogMutationSuccess = (msg) => {
		queryClient.invalidateQueries(['blogs'])
		dispatch(showNotif({msg,type:'success'}))
	}

	const addBlogMutation = useMutation({
		mutationFn: (blogToCreate) => blogService.create(blogToCreate, token),
		onSuccess: (createdBlog) => {
			blogMutationSuccess(`created new blog: ${createdBlog.title}`)
		}
	})

	const likeBlogMutation = useMutation({
		mutationFn: (blogToLike) => blogService.like(blogToLike, token),
		onSuccess: (likedBlog) => {
			blogMutationSuccess(`you liked: ${likedBlog.title}`)
		}
	})

	const removeBlogMutation = useMutation({
		mutationFn: (blogToRemove) => blogService.remove(blogToRemove, token),
		onSuccess: (deletedBlog) => {
			blogMutationSuccess(`blog deleted: ${deletedBlog.title}`)
		}
	})

	return {blogsQuery, addBlogMutation, likeBlogMutation, removeBlogMutation}

}
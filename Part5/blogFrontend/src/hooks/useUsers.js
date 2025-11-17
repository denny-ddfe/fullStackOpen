import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import userService from '../services/users'

export const useUsers = () => {

	const queryClient = useQueryClient()

	const usersQuery = useQuery({
		queryKey: ['users'],
		queryFn: userService.getAll
	})

	return {usersQuery}

}
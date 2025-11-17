import {useUsers} from '../hooks/useUsers'

const UserList = () => {

	const {usersQuery} = useUsers()

	if (usersQuery.isLoading) {return <p>Loading...</p>}
	if (usersQuery.isError) {return <p>Failed to load users.</p>}

	return (
		<>
			<h2>Users</h2>
			<table>

				<thead>
					<tr>
						<td></td>
						<td>Blogs created</td>
					</tr>
				</thead>

				<tbody>
					{usersQuery.data.map((user)=>
						<tr key={user.username}>
							<td>{user.username}</td>
							<td> {user.blogs.length}</td>
						</tr>)
					}
				</tbody>

			</table>
		</>
	)

}

export default UserList
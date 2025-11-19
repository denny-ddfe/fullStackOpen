import {useUsers} from '../hooks/useUsers'
import { Link } from 'react-router-dom'

import { 
	TableContainer, 
	Table,
	TableHead, 
	TableBody, 
	TableRow,
	TableCell,
	Typography
} from '@mui/material'
import PageHeader from './PageHeader'

const UserList = () => {

	const {usersQuery} = useUsers()

	if (usersQuery.isLoading) {return <p>Loading...</p>}
	if (usersQuery.isError) {return <p>Failed to load users.</p>}

	return (
		<>
			<PageHeader caption='Users'/>
			<TableContainer>
				<Table sx={{width:'60%', marginLeft: 'auto', marginRight: 'auto'}}>
					<TableHead>
						<TableRow>
							<TableCell width={'80%'}>Username</TableCell>
							<TableCell>Blogs created</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{usersQuery.data.map((user)=>
							<TableRow key={user.username}>
								<TableCell><Link to={user.id}>{user.username}</Link></TableCell>
								<TableCell> {user.blogs.length}</TableCell>
							</TableRow>)
						}
					</TableBody>

				</Table>
			</TableContainer>
		</>
	)

}

export default UserList
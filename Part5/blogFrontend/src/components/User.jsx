import { useUsers } from "../hooks/useUsers"
import { Link, useMatch } from "react-router-dom"
import PageHeader from "./PageHeader"
import { List, ListItem, ListItemText, Stack, Typography } from "@mui/material"

const User = () => {

	const {usersQuery} = useUsers()

	const match = useMatch('/users/:id')
	
	if (usersQuery.isLoading) {return <p>Loading...</p>}
	if (usersQuery.isError) {return <p>Failed to load users.</p>}

	const user = usersQuery.data.find((user) => user.id===match.params.id)
	
  return (
		<>

			<PageHeader caption={`${user.name}`}/>

			<Stack sx={{width:'60%', marginLeft:'auto', marginRight:'auto'}}>

				<Typography variant="h6">Added Blogs</Typography>

				<List>
					{user.blogs.map((blog) => {
						return <ListItem 
							key={blog.id}
							component={Link}
							to={`/blogs/${blog.id}`}
						>
							<ListItemText>{blog.title}</ListItemText>
						</ListItem>
					})}
				</List>
				
			</Stack>
		</> 
  )
}

export default User
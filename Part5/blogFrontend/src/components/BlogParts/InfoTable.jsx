import { 
	TableContainer,
	Table,
	TableBody,
	TableRow,
	TableCell
 } from "@mui/material"

const InfoTable = ({blog}) => {

	return <TableContainer>
		<Table>
			<TableBody>
				{/* URL Row */}
				<TableRow>
					<TableCell component="th" scope="row">
						Link to original
					</TableCell>
					<TableCell>
						<a href={blog.url}>Click here</a>
					</TableCell>
				</TableRow>

				{/* Likes Row */}
				<TableRow>
					<TableCell component="th" scope="row">
						Likes
					</TableCell>
					<TableCell>
						{blog.likes}
					</TableCell>
				</TableRow>

				{/* Contributor Row */}
				<TableRow>
					<TableCell component="th" scope="row">
						Contributor
					</TableCell>
					<TableCell>{blog.user.name}</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	</TableContainer>
}

export default InfoTable
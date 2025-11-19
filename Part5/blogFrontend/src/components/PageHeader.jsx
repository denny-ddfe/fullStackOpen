import { Typography } from "@mui/material";

const PageHeader = ({caption}) => {
	return <Typography 
		variant="h4"
		sx={{marginTop:'10px'}}
	>
		{caption}
	</Typography>
}

export default PageHeader
import React from "react";
import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Button,
} from "@mui/material";

export default function CardLinks(props) {
	const handleClick = () => {
		console.log(props.link);
	};
	return (
		<Card sx={{ width: 400, height: 350 }}>
			<CardMedia
				component="img"
				height="200"
				image="https://media.istockphoto.com/photos/objectives-word-on-paper-through-magnifying-lens-picture-id1320879074?b=1&k=20&m=1320879074&s=170667a&w=0&h=oiLBgFo89zDqwWQAEedqOeitin89ceJF3wIxj7yzh-A="
				alt="green iguana"
			/>
			<CardContent>
				<Typography variant="h5" component="div">
					{props.link.title}
				</Typography>
				<Typography variant="body2">{props.link.description}</Typography>
			</CardContent>
			<CardActions>
				<a href={props.link.url} taget="_blank">
					<Button size="small">Go to page</Button>
				</a>
			</CardActions>
		</Card>
	);
}

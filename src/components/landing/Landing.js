import React from "react";
import "../../styles/global.css";
import { Box, Grid } from "@mui/material";
import CardLinks from "./CardLinks";

export default function Landing() {
	const links = [
		{
			title: "First Link",
			description: "This is the card for the first link.",
			url: "https://mui.com/material-ui/react-card/",
		},
		{
			title: "Second Link",
			description: "This is the card for the second link.",
			url: "https://mui.com/material-ui/react-card/",
		},
		{
			title: "Third Link",
			description: "This is the card for the third link.",
			url: "https://mui.com/material-ui/react-card/",
		},
	];
	return (
		<div className="body">
			<h3>Landing</h3>
			<p>This is your admin dashboard.</p>
			<br />
			<Box>
				{
					<Grid container spacing={2}>
						{links.map((link, index) => (
							<Grid item key={index}>
								<CardLinks key={link.title} link={link} />
							</Grid>
						))}
					</Grid>
				}
			</Box>
		</div>
	);
}

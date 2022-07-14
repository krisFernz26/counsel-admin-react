import React from "react";
import "../../styles/global.css";
import { Box, Grid } from "@mui/material";
import CardLinks from "./CardLinks";

export default function Landing() {
	const links = [
		{
			title: "Institution Dashboard",
			description: "Handle your institution's data.",
			url: "https://mui.com/material-ui/react-card/",
		},
		{
			title: "Counselor Dashboard",
			description:
				"Access your counselor profile, appointments, schedules and notes.",
			url: "https://mui.com/material-ui/react-card/",
		},
		{
			title: "Student Dashboard",
			description: "Access your student profile and appointments.",
			url: "https://mui.com/material-ui/react-card/",
		},
	];
	return (
		<div className="body">
			<h3>Other dashboards</h3>
			{/* <p>This is your admin dashboard.</p> */}
			<br />
			<Box>
				{
					<Grid container spacing={4}>
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

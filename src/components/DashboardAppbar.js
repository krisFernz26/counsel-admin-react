import React from "react";
import {
	Box,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Button,
} from "@mui/material";

export default function DashboardAppbar(props) {
	return (
		<header>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="sticky">
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="secondary"
							aria-label="menu"
							sx={{ mr: 2 }}
						>
							{/* <MenuIcon /> */}
						</IconButton>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							Counselapp Admin Dashboard
						</Typography>
						<Button color="inherit" onClick={props.logout}>
							Logout
						</Button>
					</Toolbar>
				</AppBar>
			</Box>
		</header>
	);
}

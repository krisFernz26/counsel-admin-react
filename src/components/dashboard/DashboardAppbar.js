import React from "react";
import {
	Box,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Button,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

export default function DashboardAppbar(props) {
	return (
		<header>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="fixed">
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="secondary"
							aria-label="menu"
							sx={{ mr: 2 }}
							onClick={props.toggleSidebar}
						>
							<Menu color="secondary" />
						</IconButton>
						<Typography
							variant="h6"
							component="div"
							sx={{ flexGrow: 1 }}
							color="secondary"
						>
							Counselor App Admin Dashboard
						</Typography>
						<Button color="secondary" onClick={props.logout}>
							Logout
						</Button>
					</Toolbar>
				</AppBar>
			</Box>
		</header>
	);
}

import React, { useState, useContext, useLayoutEffect, useEffect } from "react";
import {
	Box,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Button,
	CircularProgress,
} from "@mui/material";
import apiClient from "../services/api";
import UserContext from "../contexts/UserContext";
import "../styles/global.css";
import { Navigate } from "react-router-dom";

export default function DashboardView(props) {
	let user = JSON.parse(localStorage.getItem("user"));
	let headers = {};
	let [isLoggedIn, setIsLoggedIn] = useState(true);
	let [loading, setLoading] = useState(false);
	let [error, setError] = useState("");

	useLayoutEffect(() => {
		if (user == null) {
			setIsLoggedIn(false);
		} else {
			headers = {
				accept: "application/json",
				Authorization: "Bearer " + user.token,
			};
		}
	}, []);

	const logout = () => {
		setLoading(true);
		apiClient
			.get("/api/logout", { headers: headers })
			.then((res) => {
				if (res.status == 200) {
					props.logout();
					setIsLoggedIn(false);
					setLoading(false);
				}
			})
			.catch((e) => {
				setError(e.message);
				setLoading(false);
			});
	};
	return (
		<div>
			{!isLoggedIn ? (
				<Navigate to="/" />
			) : loading ? (
				<CircularProgress />
			) : (
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
								<Button color="inherit" onClick={logout}>
									Logout
								</Button>
							</Toolbar>
						</AppBar>
					</Box>
				</header>
			)}
		</div>
	);
}

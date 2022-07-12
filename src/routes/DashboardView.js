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
	let user = useContext(UserContext);
	let [isLoggedIn, setIsLoggedIn] = useState(true);
	let [token, setToken] = useState("");
	let [loading, setLoading] = useState(false);
	let [error, setError] = useState("");

	useLayoutEffect(() => {
		if (user == null) {
			setIsLoggedIn(false);
		}
	}, []);

	const logout = () => {
		setLoading(true);
		apiClient.interceptors.request.use(function (config) {
			const token = token;
			config.headers.Authorization = token ? `Bearer ${token}` : "";
			return config;
		});
		apiClient
			.get("/api/logout")
			.catch((e) => {
				setError(e.message);
				setLoading(false);
			})
			.then((res) => {
				// if (res.status == 200) {
				console.log(res);
				props.setUser(null);
				props.logout();
				setIsLoggedIn(false);
				setLoading(false);
				// }
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

import { Component, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import apiClient from "../services/api";
import { Stack, Box, TextField, Button, CircularProgress } from "@mui/material";
import "../styles/global.css";
import "../styles/routes/login/view.css";

import React from "react";

export default function LoginView(props) {
	let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");
	let [error, setError] = useState("");
	let [isLoggedIn, setIsLoggedIn] = useState(false);
	let [loading, setLoading] = useState(false);
	let postData = () => {
		setLoading(true);
		apiClient.get(`/sanctum/csrf-cookie`).then((res) => {
			apiClient
				.post(`/api/admin/login`, {
					email: email,
					password: password,
				})
				.then((response) => {
					if (response.status == 201) {
						console.log(response.data);
						setLoading(false);
						localStorage.setItem("user", JSON.stringify(response.data));
						props.login();
						setIsLoggedIn(true);
					}
				})
				.catch((e) => {
					setError(e.message);
					setLoading(false);
				});
		});
		// axios.defaults.headers.post["X-CSRF-Token"] = response.data._csrf;
	};
	return (
		<div id="login-view" className="body">
			{isLoggedIn ? (
				<Navigate to="/dashboard" />
			) : loading ? (
				<CircularProgress />
			) : (
				<Box
					component="form"
					sx={{
						width: "20vw",
					}}
					noValidate
					autoComplete="off"
				>
					<Stack direction="column" spacing={2}>
						<h3>Admin Login</h3>
						{/* {error ? error.target.value : ""} */}
						<TextField
							required
							id="outlined"
							label="Email Address"
							placeholder="example@example.com"
							size="small"
							type="email"
							fullWidth
							color="secondary"
							onChange={(e) => setEmail(e.target.value)}
						/>

						<TextField
							id="outlined-password-input"
							label="Password *"
							placeholder="password123"
							size="small"
							type="password"
							autoComplete="current-password"
							helperText="8+ characters"
							fullWidth
							color="secondary"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button
							variant="outlined"
							color="secondary"
							size="small"
							onClick={postData}
						>
							Login
						</Button>
						<Button
							component={Link}
							to="register"
							variant="outlined"
							color="secondary"
						>
							Register
						</Button>
						<Button
							size="small"
							component={Link}
							to="/"
							variant="outlined"
							color="secondary"
						>
							Go back
						</Button>
					</Stack>
				</Box>
			)}
		</div>
	);
}

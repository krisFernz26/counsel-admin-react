import { Component, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Stack, Box, TextField, Button, CircularProgress } from "@mui/material";
import "../styles/global.css";
import "../styles/routes/login/view.css";

import React from "react";

export default function LoginView() {
	let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");
	let [error, setError] = useState("");
	let [loading, setLoading] = useState(false);
	let postData = () => {
		setLoading(true);
		axios.defaults.withCredentials = true;
		axios.get(`http://localhost:8000/sanctum/csrf-cookie`).then((res) => {
			axios
				.post(
					`http://localhost:8000/api/login`,
					{
						email,
						password,
					},
					{
						xsrfHeaderName: "X-XSRF-TOKEN",
						withCredentials: true,
					}
				)
				.catch((e) => {
					setError(e.message);
					setLoading(false);
				})
				.then((response) => {
					console.log(response);
					setLoading(false);
				});
		});
		// axios.defaults.headers.post["X-CSRF-Token"] = response.data._csrf;
	};
	return (
		<div id="login-view" className="body">
			{loading ? (
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

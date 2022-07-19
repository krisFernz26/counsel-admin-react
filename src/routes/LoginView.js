import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { isEmail, isLength, isEmpty } from "validator";
import apiClient from "../services/api";
import { Stack, Box, TextField, Button, CircularProgress } from "@mui/material";
import "../styles/global.css";
import "../styles/routes/login/view.css";

import React from "react";

export default function LoginView(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({
		email: false,
		password: false,
	});
	const validateFields = () => {
		setErrors({
			email: isEmpty(email) || !isEmail(email),
			password: isEmpty(password) || !isLength(password, { min: 8 }),
		});
	};
	const login = () => {
		validateFields();
		if (!(errors["email"] && errors["password"])) {
			setLoading(true);
			apiClient.get(`/sanctum/csrf-cookie`).then((res) => {
				apiClient
					.post(`/api/admin/login`, {
						email: email,
						password: password,
					})
					.then((response) => {
						if (response.status == 201) {
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
		}
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
							type="email"
							fullWidth
							onChange={(e) => {
								setEmail(e.target.value);
								validateFields();
							}}
							helperText={
								errors["email"] ? "Please input your correct admin email" : ""
							}
							error={errors["email"]}
						/>

						<TextField
							id="outlined-password-input"
							label="Password *"
							placeholder="password123"
							type="password"
							autoComplete="current-password"
							fullWidth
							onChange={(e) => {
								setPassword(e.target.value);
								validateFields();
							}}
							helperText={
								errors["password"] ? "Please input your password" : ""
							}
							error={errors["password"]}
						/>
						<Button variant="outlined" onClick={login}>
							Login
						</Button>
						<Button component={Link} to="/" variant="outlined">
							Go back
						</Button>
					</Stack>
				</Box>
			)}
		</div>
	);
}

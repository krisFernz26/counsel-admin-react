import { Component, useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { isEmail, isLength } from "validator";
import apiClient from "../services/api";
import { Stack, Box, TextField, Button, CircularProgress } from "@mui/material";
import "../styles/global.css";
import "../styles/routes/login/view.css";

import React from "react";
import UserContext from "../contexts/UserContext";

export default function LoginView(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState(false);
	const [passError, setPassError] = useState(false);
	const [error, setError] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loading, setLoading] = useState(false);
	const validateFields = () => {
		if (!isEmail(email)) {
			setEmailError(true);
		} else {
			setEmailError(false);
		}
		if (!isLength(password, { min: 8 })) {
			setPassError(true);
		} else {
			setPassError(false);
		}
	};
	const login = () => {
		validateFields();
		if (!(emailError && passError)) {
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
								emailError ? "Please input your correct admin email" : ""
							}
							error={emailError ? true : false}
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
							helperText={passError ? "Please input your password" : ""}
							error={passError ? true : false}
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

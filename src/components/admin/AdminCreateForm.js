import {
	Card,
	CardContent,
	TextField,
	Box,
	Button,
	Stack,
	Divider,
	CircularProgress,
	MenuItem,
} from "@mui/material";
import React, { useState, useLayoutEffect } from "react";
import { isEmail, isLength, isEmpty, isAlphanumeric } from "validator";
import apiClient from "../../services/api";

export default function AdminCreateForm() {
	const [institutionId, setInstitutionId] = useState("1");
	const [roleId, setRoleId] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [address, setAddress] = useState("");
	const [birthdate, setBirthdate] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [institutions, setInstitutions] = useState([]);
	const [errors, setErrors] = useState({
		institution: false,
		email: false,
		password: false,
		username: false,
		firstName: false,
		lastName: false,
		birthdate: false,
	});
	const token = JSON.parse(localStorage.getItem("user")).token;
	const headers = {
		accept: "application/json",
		Authorization: "Bearer " + token,
	};
	useLayoutEffect(() => {
		setLoading(true);
		apiClient
			.get("/api/institutions/names", {
				headers: headers,
			})
			.then((res) => {
				setInstitutions(res.data);
				setLoading(false);
			});
	}, []);

	const validateFields = () => {
		setErrors({
			firstName: isEmpty(firstName),
			lastName: isEmpty(lastName),
			institution: isEmpty(institutionId),
			username: isEmpty(username) || !isAlphanumeric(username),
			email: isEmpty(email) || !isEmail(email),
			password: isEmpty(password) || !isLength(password, { min: 8 }),
		});
	};
	const onSubmit = () => {
		console.log("Sumbitted form");
	};
	return (
		<Box
			component="form"
			sx={{
				"& .MuiTextField-root": { m: 1, width: "50ch" },
			}}
			autoComplete="off"
			display="flex"
			alignItems="center"
			justifyContent="center"
		>
			{/* institution, role, first_name, last_name, address, birthdate, username, email, password */}
			{loading ? (
				<CircularProgress />
			) : (
				<Stack spacing={2}>
					<TextField
						required
						select
						label="Institution Name"
						// fullWidth
						onChange={(e) => {
							setInstitutionId(e.target.value);
							validateFields();
						}}
						helperText={
							errors["institution"] ? "Please choose your institution" : ""
						}
						error={errors["institution"]}
						value={institutionId}
					>
						{institutions.map((institution) => (
							<MenuItem
								key={institution["id"]}
								value={institution["id"].toString()}
							>
								{institution["name"]}
							</MenuItem>
						))}
					</TextField>
					<TextField
						required
						label="First Name"
						placeholder="John"
						type="text"
						// fullWidth
						onChange={(e) => {
							setFirstName(e.target.value);
							validateFields();
						}}
						helperText={
							errors["firstName"] ? "Please input your first name" : ""
						}
						error={errors["firstName"]}
					/>
					<TextField
						required
						label="Last Name"
						placeholder="Doe"
						type="text"
						// fullWidth
						onChange={(e) => {
							setLastName(e.target.value);
							validateFields();
						}}
						helperText={errors["lastName"] ? "Please input your last name" : ""}
						error={errors["lastName"]}
					/>
					<TextField
						required
						label="Email"
						placeholder="john.doe@counsel.com"
						type="email"
						// fullWidth
						onChange={(e) => {
							setEmail(e.target.value);
							validateFields();
						}}
						helperText={errors["email"] ? "Please input an email" : ""}
						error={errors["email"]}
					/>
					<TextField
						label="Password"
						placeholder="password123"
						type="password"
						required
						onChange={(e) => {
							setPassword(e.target.value);
							validateFields();
						}}
						helperText={errors["password"] ? "Please input your password" : ""}
						error={errors["password"]}
					/>
					<TextField
						required
						label="Username"
						placeholder="johnDoe123"
						type="text"
						// fullWidth
						onChange={(e) => {
							setUsername(e.target.value);
							validateFields();
						}}
						helperText={errors["username"] ? "Please input a username" : ""}
						error={errors["username"]}
					/>
					<TextField
						label="Address"
						placeholder=""
						type="text"
						// fullWidth
						onChange={(e) => {
							setAddress(e.target.value);
							validateFields();
						}}
					/>
					<TextField
						label="Birthdate"
						type="date"
						// fullWidth
						onChange={(e) => {
							setBirthdate(e.target.value);
							validateFields();
						}}
						helperText={
							errors["birthdate"] ? "Please input your birthdate" : ""
						}
						error={errors["birthdate"]}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<Button variant="outlined">Create new admin account</Button>
				</Stack>
			)}
		</Box>
	);
}

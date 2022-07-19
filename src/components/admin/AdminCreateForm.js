import {
	Card,
	CardContent,
	TextField,
	Box,
	Button,
	Stack,
	Divider,
} from "@mui/material";
import React, { useState } from "react";
import { isEmail, isLength, isEmpty, isAlphanumeric } from "validator";

export default function AdminCreateForm() {
	const [institutionId, setInstitutionId] = useState("");
	const [roleId, setRoleId] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [address, setAddress] = useState("");
	const [birthdate, setBirthdate] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({
		institution: false,
		email: false,
		password: false,
		username: false,
		firstName: false,
		lastName: false,
		birthdate: false,
	});
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
			<Stack spacing={2}>
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
					helperText={errors["firstName"] ? "Please input your first name" : ""}
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
					placeholder="Jan 1, 1998"
					type="date"
					// fullWidth
					onChange={(e) => {
						setBirthdate(e.target.value);
						validateFields();
					}}
					helperText={errors["birthdate"] ? "Please input your birthdate" : ""}
					error={errors["birthdate"]}
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<Button variant="outlined">Create new admin account</Button>
			</Stack>
		</Box>
	);
}

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
	Alert,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import React, { useState, useLayoutEffect } from "react";
import { isEmail, isLength, isEmpty, isAlphanumeric } from "validator";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import apiClient from "../../services/api";

export default function AdminCreateForm() {
	const [institutionId, setInstitutionId] = useState("1");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [address, setAddress] = useState("");
	const [birthdate, setBirthdate] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [institutions, setInstitutions] = useState([]);
	const [successAlert, setSuccessAlert] = useState(false);
	const [errorAlert, setErrorAlert] = useState({
		value: false,
		message: "Error",
	});
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
				validateFields();
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
		return !Object.values(errors).includes(true);
	};
	const onSubmit = () => {
		validateFields()
			? registerUser()
			: setErrorAlert({ value: true, message: "Input correct data" });
	};
	const registerUser = () => {
		setLoading(true);
		apiClient
			.post(
				"/api/register",
				{
					first_name: firstName,
					last_name: lastName,
					institution_id: institutionId,
					role_id: 1,
					address: address,
					birthdate: birthdate,
					email: email,
					password: password,
					username: username,
				},
				{
					headers: headers,
				}
			)
			.then((res) => {
				console.log(res);
				if (res["status"] == 201) {
					setErrorAlert({ value: false, message: "" });
					setSuccessAlert(true);
				} else {
					setSuccessAlert(false);
					setErrorAlert({ value: true, message: "Account creation failed" });
				}
				setLoading(false);
			});
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
					{successAlert || errorAlert ? (
						<Box mb={"20px"}>
							{successAlert ? (
								<Alert
									severity="success"
									onClose={() => setSuccessAlert(false)}
								>
									Admin account created successfully
								</Alert>
							) : (
								""
							)}
							{errorAlert["value"] ? (
								<Alert
									severity="error"
									onClose={() => setErrorAlert({ value: false, message: "" })}
								>
									{errorAlert["message"]}
								</Alert>
							) : (
								""
							)}
						</Box>
					) : (
						""
					)}
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
					<LocalizationProvider dateAdapter={AdapterMoment}>
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
					</LocalizationProvider>
					<Button variant="outlined" onClick={onSubmit}>
						Create new admin account
					</Button>
				</Stack>
			)}
		</Box>
	);
}

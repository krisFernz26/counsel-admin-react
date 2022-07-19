import { Card, CardContent, TextField, Box } from "@mui/material";
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
			username: isAlphanumeric(username),
			email: isEmail(email),
			password: isLength(password, { min: 8 }),
		});
	};
	const onSubmit = () => {
		console.log("Sumbitted form");
	};
	return (
		<Box sx={{ width: 100, height: "calc(100vh - 64px)" }}>
			<Card className="form-card" sx={{ minWidth: "80vw" }}>
				<CardContent>
					<form onSubmit={onSubmit}>
						{/* institution, role, first_name, last_name, address, birthdate, username, email, password */}
						<TextField
							required
							id="outlined"
							label="First Name"
							placeholder="John"
							type="text"
							// fullWidth
							onChange={(e) => {
								setEmail(e.target.value);
								validateFields();
							}}
							helperText={
								errors["firstName"] ? "Please input your first name" : ""
							}
							error={errors["firstName"]}
						/>
					</form>
				</CardContent>
			</Card>
		</Box>
	);
}

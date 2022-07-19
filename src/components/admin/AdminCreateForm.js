import { Card, CardContent, TextField } from "@mui/material";
import React, { useState } from "react";

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
	const onSubmit = () => {
		console.log("Sumbitted form");
	};
	return (
		<div>
			<Card className="form-card">
				<CardContent>
					<form onSubmit={onSubmit}>
						{/* institution, role, first_name, last_name, address, birthdate, username, email, password */}
						<TextField
							required
							id="outlined"
							label="First Name"
							placeholder="John"
							type="text"
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
						<TextField />
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

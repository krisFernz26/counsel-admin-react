import React, { useState } from "react";
import { isEmail, isEmpty } from "validator";
import apiClient from "../../services/api";
import {
	TextField,
	Box,
	Button,
	Stack,
	CircularProgress,
	MenuItem,
	Alert,
} from "@mui/material";

export default function InstitutionsCreateForm() {
	// name*, address, contact_no, contact_email, contact_person_name, contact_person_no, logo, attachments
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [contactNo, setContactNo] = useState("");
	const [contactEmail, setContactEmail] = useState("");
	const [contactPersonName, setContactPersonName] = useState("");
	const [contactPersonNo, setContactPersonNo] = useState("");
	const [logo, setLogo] = useState("");
	const [attachments, setAttachments] = useState([]);
	const [loading, setLoading] = useState(false);
	const [successAlert, setSuccessAlert] = useState(false);
	const token = JSON.parse(localStorage.getItem("user")).token;
	const headers = {
		accept: "application/json",
		Authorization: "Bearer " + token,
	};
	const [errorAlert, setErrorAlert] = useState({
		value: false,
		message: "Error",
	});
	const [errors, setErrors] = useState({
		name: false,
		contactEmail: false,
	});
	const validateFields = () => {
		setErrors({
			name: isEmpty(name),
		});
		return !Object.values(errors).includes(true);
	};
	const onSubmit = () => {
		validateFields()
			? createInstitution()
			: setErrorAlert({ value: true, message: "Input correct data" });
	};
	const createInstitution = () => {
		setLoading(true);
		apiClient
			.post(
				"/api/institutions",
				{
					name: name,
					address: address,
					contact_no: contactNo,
					contact_email: contactEmail,
					contact_person_name: contactPersonName,
					contact_person_no: contactPersonNo,
					// logo: logo,
					// attachments: attachments,
				},
				{
					headers: headers,
				}
			)
			.then((res) => {
				if (res["status"] == 201) {
					setErrorAlert({ value: false, message: "" });
					setSuccessAlert(true);
				} else {
					setSuccessAlert(false);
					setErrorAlert({
						value: true,
						message: "Institution creation failed",
					});
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
									Institution created successfully
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
						label="Name"
						placeholder="Counselapp"
						type="text"
						// fullWidth
						onChange={(e) => {
							setName(e.target.value);
							validateFields();
						}}
						helperText={
							errors["name"] ? "Please input the institution name" : ""
						}
						error={errors["name"]}
					/>
					<TextField
						label="Address"
						placeholder="28708 Schowalter Park Apt. 004Blickborough"
						type="text"
						// fullWidth
						onChange={(e) => {
							setAddress(e.target.value);
							validateFields();
						}}
					/>
					<TextField
						label="Contact Number"
						placeholder="+16173912348"
						type="text"
						// fullWidth
						onChange={(e) => {
							setContactNo(e.target.value);
							validateFields();
						}}
					/>
					<TextField
						label="Contact Email"
						placeholder="john.doe@counsel.com"
						type="email"
						// fullWidth
						onChange={(e) => {
							setContactEmail(e.target.value);
							validateFields();
						}}
					/>
					<TextField
						label="Contact Person Name"
						placeholder="John Doe"
						type="text"
						// fullWidth
						onChange={(e) => {
							setContactPersonName(e.target.value);
							validateFields();
						}}
					/>
					<TextField
						label="Contact Person Number"
						placeholder="+16173912348"
						type="text"
						// fullWidth
						onChange={(e) => {
							setContactPersonNo(e.target.value);
							validateFields();
						}}
					/>
					<Button variant="outlined" onClick={onSubmit}>
						Create new institution
					</Button>
				</Stack>
			)}
		</Box>
	);
}

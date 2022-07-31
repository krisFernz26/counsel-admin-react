import React, { useState, useEffect } from "react";
import {
	Box,
	Button,
	Modal,
	Typography,
	TextField,
	Stack,
	Alert,
	CircularProgress,
} from "@mui/material";
import { isEmail, isEmpty } from "validator";
import apiClient from "../../services/api";

export default function InstitutionUpdateModal({
	institutionId,
	updateModalOpen,
	handleOnUpdateModalClose,
	updateInstitution,
	approveInstitution,
}) {
	const token = JSON.parse(localStorage.getItem("user")).token;
	const [institutionInfo, setInstitutionInfo] = useState({});
	const [loading, setLoading] = useState(true);
	const headers = {
		accept: "application/json",
		Authorization: "Bearer " + token,
	};
	const modalStyle = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: "auto",
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
		"& .MuiTextField-root": { m: 1, width: "50ch" },
	};
	const [errorAlert, setErrorAlert] = useState({
		value: false,
		message: "Error",
	});
	const [errors, setErrors] = useState({
		// institution: false,
		name: false,
	});
	useEffect(() => {
		apiClient
			.get(`/api/institutions/${institutionId}`, {
				headers: headers,
			})
			.then((res) => {
				setInstitutionInfo(res.data);
				setLoading(false);
			});
	}, []);
	const validateFields = () => {
		setErrors({
			name: isEmpty(institutionInfo["name"]),
			// contact_email: !isEmail(institutionInfo["contact_email"]),
			// institution: isEmpty(institutionId),
		});
		return !Object.values(errors).includes(true);
	};
	const onSubmit = () => {
		if (validateFields()) {
			updateInstitution({
				name: institutionInfo["name"],
				address: institutionInfo["address"],
				contact_person_name: institutionInfo["contact_person_name"],
				contact_no: institutionInfo["contact_no"],
				contact_email: institutionInfo["contact_email"],
				contact_person_no: institutionInfo["contact_person_no"],
			});
			handleOnUpdateModalClose();
		} else {
			//   console.log(institutionInfo)
			setErrorAlert({ value: true, message: "Input correct data" });
		}
	};
	return (
		<>
			<Modal
				// keepMounted
				open={updateModalOpen}
				onClose={handleOnUpdateModalClose}
				aria-labelledby="keep-mounted-modal-title"
				aria-describedby="keep-mounted-modal-description"
			>
				<Box
					sx={modalStyle}
					component="form"
					autoComplete="off"
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					{loading ? (
						<CircularProgress />
					) : (
						<Stack spacing={2}>
							<Box mb={"20px"}>
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
							<Typography
								id="keep-mounted-modal-title"
								variant="h6"
								component="h2"
							>
								Update Institution Info
							</Typography>
							<TextField
								required
								label="Name"
								type="text"
								defaultValue={institutionInfo["name"]}
								placeholder={institutionInfo["name"]}
								// fullWidth
								onChange={(e) => {
									setInstitutionInfo((prevInstitutionInfo) => ({
										...prevInstitutionInfo,
										name: e.target.value,
									}));
									validateFields();
								}}
								helperText={
									errors["name"] ? "Please input the institution name" : ""
								}
								error={errors["Name"]}
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<TextField
								label="Address"
								defaultValue={institutionInfo["address"]}
								placeholder={institutionInfo["address"]}
								type="text"
								// fullWidth
								onChange={(e) => {
									setInstitutionInfo((prevInstitutionInfo) => ({
										...prevInstitutionInfo,
										address: e.target.value,
									}));
									validateFields();
								}}
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<TextField
								label="Contact Number"
								defaultValue={institutionInfo["contact_no"]}
								placeholder={institutionInfo["contact_no"]}
								type="text"
								// fullWidth
								onChange={(e) => {
									setInstitutionInfo((prevInstitutionInfo) => ({
										...prevInstitutionInfo,
										contact_no: e.target.value,
									}));
									validateFields();
								}}
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<TextField
								label="Contact Email"
								defaultValue={institutionInfo["contact_email"]}
								placeholder={institutionInfo["contact_email"]}
								type="text"
								// fullWidth
								onChange={(e) => {
									setInstitutionInfo((prevInstitutionInfo) => ({
										...prevInstitutionInfo,
										contact_email: e.target.value,
									}));
									validateFields();
								}}
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<TextField
								label="Contact Person Name"
								defaultValue={institutionInfo["contact_person_name"]}
								placeholder={institutionInfo["contact_person_name"]}
								type="text"
								// fullWidth
								onChange={(e) => {
									setInstitutionInfo((prevInstitutionInfo) => ({
										...prevInstitutionInfo,
										contact_person_name: e.target.value,
									}));
									validateFields();
								}}
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<TextField
								label="Contact Person Number"
								defaultValue={institutionInfo["contact_person_no"]}
								placeholder={institutionInfo["contact_person_no"]}
								type="text"
								// fullWidth
								onChange={(e) => {
									setInstitutionInfo((prevInstitutionInfo) => ({
										...prevInstitutionInfo,
										contact_person_no: e.target.value,
									}));
									validateFields();
								}}
								InputLabelProps={{
									shrink: true,
								}}
							/>
							{institutionInfo["approved_at"] === null ? (
								<Button
									variant="outlined"
									color="success"
									onClick={approveInstitution}
								>
									Approve institution
								</Button>
							) : (
								""
							)}
							<Button variant="outlined" onClick={onSubmit}>
								Update institution info
							</Button>
						</Stack>
					)}
				</Box>
			</Modal>
		</>
	);
}

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
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { isEmpty } from "validator";
import apiClient from "../../services/api";

export default function UserUpdateModal({
	userId,
	updateModalOpen,
	handleOnUpdateModalClose,
	updateUser,
}) {
	const token = JSON.parse(localStorage.getItem("user")).token;
	const [userInfo, setUserInfo] = useState({});
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
		firstName: false,
		lastName: false,
		birthdate: false,
	});
	useEffect(() => {
		apiClient
			.get(`/api/users/${userId}`, {
				headers: headers,
			})
			.then((res) => {
				setUserInfo(res.data);
				setLoading(false);
			});
	}, []);
	const validateFields = () => {
		setErrors({
			firstName: isEmpty(userInfo["first_name"]),
			lastName: isEmpty(userInfo["last_name"]),
			// institution: isEmpty(institutionId),
		});
		return !Object.values(errors).includes(true);
	};
	const onSubmit = () => {
		if (validateFields()) {
			updateUser({
				first_name: userInfo["first_name"],
				last_name: userInfo["last_name"],
				address: userInfo["address"] ?? null,
				birthdate: userInfo["birthdate"] ?? null,
			});
			handleOnUpdateModalClose();
		} else {
			//   console.log(userInfo)
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
								Update User Info
							</Typography>
							<TextField
								required
								label="First Name"
								type="text"
								defaultValue={userInfo["first_name"]}
								placeholder={userInfo["first_name"]}
								// fullWidth
								onChange={(e) => {
									setUserInfo((prevUserInfo) => ({
										...prevUserInfo,
										first_name: e.target.value,
									}));
									validateFields();
								}}
								helperText={
									errors["firstName"] ? "Please input your first name" : ""
								}
								error={errors["firstName"]}
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<TextField
								required
								label="Last Name"
								defaultValue={userInfo["last_name"]}
								placeholder={userInfo["last_name"]}
								type="text"
								// fullWidth
								onChange={(e) => {
									setUserInfo((prevUserInfo) => ({
										...prevUserInfo,
										last_name: e.target.value,
									}));
									validateFields();
								}}
								helperText={
									errors["lastName"] ? "Please input your last name" : ""
								}
								error={errors["lastName"]}
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<TextField
								label="Address"
								defaultValue={userInfo["address"]}
								placeholder={userInfo["address"]}
								type="text"
								// fullWidth
								onChange={(e) => {
									setUserInfo((prevUserInfo) => ({
										...prevUserInfo,
										address: e.target.value,
									}));
									validateFields();
								}}
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<LocalizationProvider dateAdapter={AdapterMoment}>
								<TextField
									label="Birthdate"
									defaultValue={userInfo["birthdate"]}
									placeholder={userInfo["birthdate"]}
									type="date"
									// fullWidth
									onChange={(e) => {
										setUserInfo((prevUserInfo) => ({
											...prevUserInfo,
											birthdate: e.target.value,
										}));
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
								Update user info
							</Button>
						</Stack>
					)}
				</Box>
			</Modal>
		</>
	);
}

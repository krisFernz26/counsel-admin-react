import React, { useState, useEffect } from "react";
import {
	Box,
	Button,
	ButtonGroup,
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	DialogContentText,
	CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Moment from "moment";
import apiClient from "../../services/api";
import UserUpdateModal from "../global/UserUpdateModal";

export default function CounselorUsersTable() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [userId, setUserId] = useState("");
	const [updateModalOpen, setUpdateModalOpen] = useState(false);
	const [successUpdateDialogOpen, setSuccessUpdateDialogOpen] = useState(false);
	const [deleteSuccessDialogOpen, setDeleteSuccessDialogOpen] = useState(false);
	const token = JSON.parse(localStorage.getItem("user")).token;
	const headers = {
		accepts: "application/json",
		Authorization: `Bearer ${token}`,
	};
	const getUsers = () => {
		apiClient
			.get("/api/users?role_id=3", {
				headers: headers,
			})
			.then((res) => {
				setUsers(res.data);
				setLoading(false);
			});
	};
	useEffect(() => {
		setLoading(true);
		getUsers();
	}, []);
	const columns = [
		{ field: "id", headerName: "ID", flex: 0.5 },
		{
			field: "institution",
			headerName: "Institution",
			sortable: true,
			editable: false,
			flex: 1,
		},
		{
			field: "email",
			headerName: "Email",
			sortable: true,
			editable: false,
			flex: 1,
		},
		{
			field: "firstName",
			headerName: "First name",
			sortable: true,
			editable: false,
			flex: 1,
		},
		{
			field: "lastName",
			headerName: "Last name",
			sortable: true,
			editable: false,
			flex: 1,
		},
		{
			field: "fullName",
			headerName: "Full name",
			sortable: false,
			flex: 1,
		},
		{
			field: "userName",
			headerName: "Username",
			editable: false,
			flex: 1,
		},
		{
			field: "createdAt",
			headerName: "Registered On",
			sortable: true,
			flex: 1,
			type: "date",
		},
		{
			field: "address",
			headerName: "Address",
			sortable: true,
			flex: 1,
		},
		{
			field: "actions",
			headerName: "Actions",
			flex: 1.25,
			alignItems: "right",
			sortable: false,
			editable: false,
			renderCell: (params) => {
				return (
					<Box>
						<ButtonGroup variant="text">
							<Button
								color="success"
								onClick={() => {
									setUserId(params.id);
									handleOnUpdateButtonClick();
								}}
							>
								Update
							</Button>
							<Button
								color="error"
								onClick={() => {
									setUserId(params.id);
									handleOnDeleteButtonClick();
								}}
							>
								Delete
							</Button>
						</ButtonGroup>
					</Box>
				);
			},
		},
	];
	const rows = users.map((user) => {
		return {
			id: user.id,
			institution: user.institution.name,
			email: user.email,
			firstName: user.first_name,
			lastName: user.last_name,
			fullName: user.first_name + " " + user.last_name,
			userName: user.username,
			createdAt: Moment(user.created_at).format("MMM Do, YYYY"),
			address: user.address,
		};
	});

	const handleOnDeleteButtonClick = () => {
		setDeleteDialogOpen(true);
	};
	const handleOnUpdateButtonClick = () => {
		setUpdateModalOpen(true);
	};
	const handleOnUpdateModalClose = () => {
		setUserId("");
		setUpdateModalOpen(false);
	};
	const handleOnDeleteDialogClose = () => {
		setUserId("");
		setDeleteDialogOpen(false);
	};
	const handleOnUpdateSuccessDialogClose = () => {
		setUserId("");
		setSuccessUpdateDialogOpen(false);
	};
	const handleOnDeleteSuccessDialogClose = () => {
		setUserId("");
		setDeleteSuccessDialogOpen(false);
	};
	const deleteUser = (id) => {
		setLoading(true);
		apiClient
			.delete(`/api/users/${id}`, {
				headers: headers,
			})
			.then((res) => {
				getUsers();
				setLoading(false);
				setDeleteDialogOpen(false);
				setDeleteSuccessDialogOpen(true);
			});
	};
	const updateUser = (data) => {
		setLoading(true);
		apiClient
			.put(`/api/users/${userId}`, data, {
				headers: headers,
			})
			.then((res) => {
				getUsers();
				setLoading(false);
				setUpdateModalOpen(false);
				setSuccessUpdateDialogOpen(true);
			});
	};
	return (
		<Box
			sx={{ height: 400 }}
			display="flex"
			justifyContent="center"
			alignItems="center"
			minHeight="100vh"
			mt="50px"
			ml="50px"
			mr="50px"
		>
			<Dialog
				open={successUpdateDialogOpen}
				onClose={handleOnUpdateSuccessDialogClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"User account updated"}
				</DialogTitle>
				<DialogActions>
					<Button onClick={handleOnUpdateSuccessDialogClose} color="success">
						OK
					</Button>
				</DialogActions>
			</Dialog>
			{userId ? (
				<UserUpdateModal
					userId={userId}
					handleOnUpdateModalClose={handleOnUpdateModalClose}
					updateModalOpen={updateModalOpen}
					updateUser={updateUser}
				/>
			) : (
				""
			)}
			<Dialog
				open={deleteSuccessDialogOpen}
				onClose={handleOnDeleteSuccessDialogClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"User account deleted"}
				</DialogTitle>
				<DialogActions>
					<Button onClick={handleOnDeleteSuccessDialogClose} color="success">
						OK
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				open={deleteDialogOpen}
				onClose={handleOnDeleteDialogClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"Delete admin account?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete this user account?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleOnDeleteDialogClose} autoFocus>
						Cancel
					</Button>
					<Button
						onClick={() => {
							deleteUser(userId);
						}}
						color="error"
					>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
			{!loading ? (
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={15}
					rowsPerPageOptions={[15]}
					disableSelectionOnClick
					centered
				/>
			) : (
				<CircularProgress />
			)}
		</Box>
	);
}

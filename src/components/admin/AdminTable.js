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

export default function AdminTable() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [deleteSuccessDialogOpen, setDeleteSuccessDialogOpen] = useState(false);
	const token = JSON.parse(localStorage.getItem("user")).token;
	const headers = {
		accepts: "application/json",
		Authorization: `Bearer ${token}`,
	};
	useEffect(() => {
		setLoading(true);
		apiClient
			.get("/api/users?role_id=1", {
				headers: headers,
			})
			.then((res) => {
				setUsers(res.data);
				setLoading(false);
			});
	}, []);
	const columns = [
		{ field: "id", headerName: "ID", flex: 0.5 },
		{ field: "institutionID", headerName: "Institution ID", flex: 0.5 },
		{
			field: "institutionName",
			headerName: "Institution",
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
			renderCell: (params) => {
				return (
					<Box>
						<ButtonGroup variant="text">
							<Button color="success">Update</Button>
							<Button color="error" onClick={handleOnDeleteButtonClick}>
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
			institutionID: user.institution.id,
			institutionName: user.institution.name,
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
	const handleOnDeleteDialogClose = () => {
		setDeleteDialogOpen(false);
	};
	const handleOnDeleteSuccessDialogClose = () => {
		setDeleteSuccessDialogOpen(false);
	};
	const deleteUser = (id) => {
		apiClient
			.delete(`/api/users/${id}`, {
				headers: headers,
			})
			.then((res) => {
				console.log(res);
				setDeleteDialogOpen(false);
				setDeleteSuccessDialogOpen(true);
			});
	};
	return (
		<Box
			sx={{ height: 400 }}
			display="flex"
			justifyContent="center"
			alignItems="center"
			minHeight="100vh"
			ml="50px"
			mr="50px"
		>
			<Dialog
				open={deleteSuccessDialogOpen}
				onClose={handleOnDeleteSuccessDialogClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"Admin account deleted"}
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
						Are you sure you want to delete this admin account?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleOnDeleteDialogClose} autoFocus>
						Cancel
					</Button>
					<Button
						onClick={() => {
							deleteUser(48);
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

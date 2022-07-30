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

export default function InstitutionsTable() {
	const [institutions, setInstitutions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [institutionId, setInsitutionId] = useState("");
	const [updateModalOpen, setUpdateModalOpen] = useState(false);
	const [successUpdateDialogOpen, setSuccessUpdateDialogOpen] = useState(false);
	const [deleteSuccessDialogOpen, setDeleteSuccessDialogOpen] = useState(false);
	const token = JSON.parse(localStorage.getItem("user")).token;
	const headers = {
		accepts: "application/json",
		Authorization: `Bearer ${token}`,
	};
	const getInstitutions = () => {
		apiClient
			.get("/api/institutions", {
				headers: headers,
			})
			.then((res) => {
				setInstitutions(res.data);
				// console.log(res.data.data);
				setLoading(false);
			});
	};
	useEffect(() => {
		setLoading(true);
		getInstitutions();
	}, []);
	const columns = [
		{ field: "id", headerName: "ID", flex: 0.5 },
		{
			field: "name",
			headerName: "Name",
			sortable: true,
			editable: false,
			flex: 1,
		},
		{
			field: "contactPerson",
			headerName: "Contact Person",
			sortable: true,
			editable: false,
			flex: 1,
		},
		{
			field: "contactPersonNumber",
			headerName: "Contact Person Number",
			sortable: true,
			editable: false,
			flex: 1,
		},
		{
			field: "contactNumber",
			headerName: "Contact Number",
			sortable: true,
			editable: false,
			flex: 1,
		},
		{
			field: "contactEmail",
			headerName: "Contact Email",
			sortable: true,
			editable: false,
			flex: 1,
		},
		{
			field: "approvedAt",
			headerName: "Approved At",
			sortable: true,
			editable: false,
			flex: 1,
		},
		{
			field: "createdAt",
			headerName: "Created At",
			sortable: true,
			editable: false,
			flex: 1,
			type: "date",
		},
		{
			field: "address",
			headerName: "Address",
			sortable: true,
			editable: false,
			flex: 1,
		},
		{
			field: "numberOfUsers",
			headerName: "No. of Users",
			sortable: true,
			editable: false,
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
									setInsitutionId(params.id);
									handleOnUpdateButtonClick();
								}}
							>
								Update
							</Button>
							<Button
								color="error"
								onClick={() => {
									setInsitutionId(params.id);
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
	const rows = institutions.map((institution) => {
		return {
			id: institution.id,
			name: institution.name,
			approvedAt: institution.approved_at,
			contactPerson: institution.contact_person,
			contactPersonNumber: institution.contact_person_no,
			contactNumber: institution.contact_no,
			contactEmail: institution.contact_email,
			createdAt: Moment(institution.created_at).format("MMM Do, YYYY"),
			address: institution.address,
			numberOfUsers: institution.users.length,
		};
	});

	const handleOnDeleteButtonClick = () => {
		setDeleteDialogOpen(true);
	};
	const handleOnUpdateButtonClick = () => {
		setUpdateModalOpen(true);
	};
	const handleOnUpdateModalClose = () => {
		setInsitutionId("");
		setUpdateModalOpen(false);
	};
	const handleOnDeleteDialogClose = () => {
		setInsitutionId("");
		setDeleteDialogOpen(false);
	};
	const handleOnUpdateSuccessDialogClose = () => {
		setInsitutionId("");
		setSuccessUpdateDialogOpen(false);
	};
	const handleOnDeleteSuccessDialogClose = () => {
		setInsitutionId("");
		setDeleteSuccessDialogOpen(false);
	};
	const deleteUser = (id) => {
		setLoading(true);
		apiClient
			.delete(`/api/institutions/${id}`, {
				headers: headers,
			})
			.then((res) => {
				getInstitutions();
				setLoading(false);
				setDeleteDialogOpen(false);
				setDeleteSuccessDialogOpen(true);
			});
	};
	const updateUser = (data) => {
		setLoading(true);
		apiClient
			.put(`/api/institutions/${institutionId}`, data, {
				headers: headers,
			})
			.then((res) => {
				getInstitutions();
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
			{institutionId ? (
				<UserUpdateModal
					institutionId={institutionId}
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
						Are you sure you want to delete this institution account?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleOnDeleteDialogClose} autoFocus>
						Cancel
					</Button>
					<Button
						onClick={() => {
							deleteUser(institutionId);
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

import React from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Moment from "moment";

export default function AdminTable({ users }) {
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
	return (
		<Box
			sx={{ height: 400, width: "100%" }}
			display="flex"
			justifyContent="center"
			alignItems="center"
			minHeight="100vh"
		>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={15}
				rowsPerPageOptions={[5]}
				disableSelectionOnClick
				centered
			/>
		</Box>
	);
}

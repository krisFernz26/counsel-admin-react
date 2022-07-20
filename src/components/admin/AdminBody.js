import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab, CircularProgress, TextField } from "@mui/material";
import AdminTable from "./AdminTable";
import AdminCreateForm from "./AdminCreateForm";
import AdminUpdateForm from "./AdminUpdateForm";
import TabPanel from "../global/TabPanel";
import apiClient from "../../services/api";

export default function AdminBody() {
	const [users, setUsers] = useState([]);
	const [nextPageUrl, setNextPageUrl] = useState("");
	const [tabValue, setTabValue] = useState(0);
	const handleChange = (event, newValue) => {
		setTabValue(newValue);
	};
	const allyProps = (index) => {
		return {
			id: `simple-tab-${index}`,
			"aria-controls": `simple-tabpanel-${index}`,
		};
	};
	return (
		<>
			<Box sx={{ width: "100%" }} mt={"64px"}>
				<Tabs
					value={tabValue}
					onChange={handleChange}
					textColor="primary"
					indicatorColor="primary"
					aria-label="primary tabs"
					centered
				>
					<Tab label="All Admins" {...allyProps(0)} />
					<Tab label="Register new Admin" {...allyProps(1)} />
				</Tabs>
			</Box>
			<TabPanel value={tabValue} index={0}>
				<h3>All Admin Users</h3>
				<AdminTable />
			</TabPanel>

			<TabPanel value={tabValue} index={1}>
				<h3>Register a new admin account</h3>
				<AdminCreateForm />
			</TabPanel>
		</>
	);
}

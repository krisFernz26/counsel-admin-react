import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab, CircularProgress } from "@mui/material";
import AdminTable from "./AdminTable";
import AdminCreateForm from "./AdminCreateForm";
import AdminUpdateForm from "./AdminUpdateForm";
import TabPanel from "../global/TabPanel";
import apiClient from "../../services/api";

export default function AdminBody() {
	const [users, setUsers] = useState([]);
	const [nextPageUrl, setNextPageUrl] = useState("");
	const [tabValue, setTabValue] = useState(0);
	const [loading, setLoading] = useState(false);
	const token = JSON.parse(localStorage.getItem("user")).token;
	const headers = {
		accept: "application/json",
		Authorization: "Bearer " + token,
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

	const handleNextPage = () => {
		apiClient
			.get(nextPageUrl, {
				headers: headers,
			})
			.then((res) => {
				setUsers(res.data);
				// setNextPageUrl(res.data);
			});
	};
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
			{loading ? (
				<CircularProgress />
			) : (
				<TabPanel value={tabValue} index={0}>
					<h3>All Admin Users</h3>
					<AdminTable users={users} />
				</TabPanel>
			)}
			<TabPanel value={tabValue} index={1}>
				<h3>Register New Admin</h3>
				<AdminCreateForm />
			</TabPanel>
		</>
	);
}
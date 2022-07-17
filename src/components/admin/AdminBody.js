import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import AdminTable from "./AdminTable";
import AdminCreateForm from "./AdminCreateForm";
import AdminUpdateForm from "./AdminUpdateForm";
import TabPanel from "../global/TabPanel";
import apiClient from "../../services/api";

export default function AdminBody() {
	const [users, setUsers] = useState([]);
	const [nextPageUrl, setNextPageUrl] = useState("");
	const [tabValue, setTabValue] = useState(0);
	const token = JSON.parse(localStorage.getItem("user")).token;
	const headers = {
		accept: "application/json",
		Authorization: "Bearer " + token,
	};
	useEffect(() => {
		apiClient
			.get("/api/users", {
				headers: headers,
			})
			.then((res) => {
				setUsers(res.data.data);
				setNextPageUrl(res.data.next_page_url);
			});
	}, []);

	const handleNextPage = () => {
		apiClient
			.get(nextPageUrl, {
				headers: headers,
			})
			.then((res) => {
				setUsers(res.data.data);
				setNextPageUrl(res.data.next_page_url);
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
			<Box sx={{ width: "100%" }}>
				<h3>Admin Body</h3>
				<Tabs
					value={tabValue}
					onChange={handleChange}
					textColor="primary"
					indicatorColor="primary"
					aria-label="primary tabs"
					centered
				>
					<Tab label="Item One" {...allyProps(0)} />
					<Tab label="Item Two" {...allyProps(1)} />
					<Tab label="Item Three" {...allyProps(2)} />
				</Tabs>
			</Box>
			<TabPanel value={tabValue} index={0}>
				Item One
			</TabPanel>
			<TabPanel value={tabValue} index={1}>
				Item Two
			</TabPanel>
			<TabPanel value={tabValue} index={2}>
				Item Three
			</TabPanel>
		</>
	);
}

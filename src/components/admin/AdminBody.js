import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab, CircularProgress, TextField } from "@mui/material";
import AdminTable from "./AdminTable";
import AdminCreateForm from "./AdminCreateForm";
import TabPanel from "../global/TabPanel";

export default function AdminBody() {
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
				<AdminTable />
			</TabPanel>

			<TabPanel value={tabValue} index={1}>
				<AdminCreateForm />
			</TabPanel>
		</>
	);
}

import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import TabPanel from "../global/TabPanel";
import StudentUsersTable from "./StudentUsersTable";
import StudentUserCreateForm from "./StudentUserCreateForm";

export default function StudentUsersBody() {
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
					<Tab label="All Students" {...allyProps(0)} />
					<Tab label="Register new Student" {...allyProps(1)} />
				</Tabs>
			</Box>
			<TabPanel value={tabValue} index={0}>
				<StudentUsersTable />
			</TabPanel>

			<TabPanel value={tabValue} index={1}>
				<StudentUserCreateForm />
			</TabPanel>
		</>
	);
}

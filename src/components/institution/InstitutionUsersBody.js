import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab, CircularProgress, TextField } from "@mui/material";
import TabPanel from "../global/TabPanel";
import InstitutionUsersTable from "./InstitutionUsersTable";
import InstitutionUserCreateForm from "./InstitutionUserCreateForm";

export default function InstitutionUsersBody() {
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
					<Tab label="All Institution Users" {...allyProps(0)} />
					<Tab label="Register new Institution User" {...allyProps(1)} />
				</Tabs>
			</Box>
			<TabPanel value={tabValue} index={0}>
				<InstitutionUsersTable />
			</TabPanel>

			<TabPanel value={tabValue} index={1}>
				<InstitutionUserCreateForm />
			</TabPanel>
		</>
	);
}

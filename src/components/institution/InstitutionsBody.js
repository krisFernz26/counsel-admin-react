import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab, CircularProgress, TextField } from "@mui/material";
import TabPanel from "../global/TabPanel";
import InstitutionsTable from "./InstitutionsTable";
import InstitutionsCreateForm from "./InstitutionsCreateForm";

export default function InstitutionsBody() {
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
					<Tab label="All Institutions" {...allyProps(0)} />
					<Tab label="Register new Institution" {...allyProps(1)} />
				</Tabs>
			</Box>
			<TabPanel value={tabValue} index={0}>
				<InstitutionsTable />
			</TabPanel>

			<TabPanel value={tabValue} index={1}>
				<InstitutionsCreateForm />
			</TabPanel>
		</>
	);
}

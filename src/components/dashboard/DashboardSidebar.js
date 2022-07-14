import React, { Fragment, useState } from "react";
import {
	Box,
	IconButton,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Divider,
	Collapse,
} from "@mui/material";
import {
	SchoolOutlined,
	BookmarkOutlined,
	AccountBoxOutlined,
	ChildCareOutlined,
	ExpandLessOutlined,
	ExpandMoreOutlined,
	StarBorder,
	ScheduleOutlined,
	VideoCallOutlined,
	AccountCircleOutlined,
	CheckBoxOutlined,
} from "@mui/icons-material";

export default function DashboardSidebar(props) {
	const [openInstitutions, setOpenInstitutions] = useState(false);
	const [openCounselors, setOpenCounselors] = useState(false);
	const [openStudents, setOpenStudents] = useState(false);
	const icons = [
		<SchoolOutlined />,
		<BookmarkOutlined />,
		<ChildCareOutlined />,
	];
	const open = [openInstitutions, openCounselors, openStudents];
	const handleOnClick = (index) => {
		if (index == 0) setOpenInstitutions(!openInstitutions);
		if (index == 1) setOpenCounselors(!openCounselors);
		if (index == 2) setOpenStudents(!openStudents);
	};

	return (
		<div>
			<Drawer
				anchor={"left"}
				open={props.sidebar}
				onClose={props.setSidebar}
				onOpen={props.setSidebar}
			>
				<Box
					sx={{ width: "auto" }}
					role="presentation"
					onClick={props.setSidebar}
					onKeyDown={props.setSidebar}
				>
					<List>
						<ListItem key="Profile">
							<ListItemButton>
								<ListItemIcon>
									<AccountBoxOutlined />
								</ListItemIcon>
								<ListItemText primary="Profile" />
							</ListItemButton>
						</ListItem>
					</List>
					<Divider />
					<List>
						{["Institutions", "Counselors", "Students"].map((text, index) => (
							<Box>
								<ListItem key={text}>
									<ListItemButton
										onClick={() => {
											handleOnClick(index);
										}}
									>
										<ListItemIcon>{icons[index]}</ListItemIcon>
										<ListItemText primary={text} sx={{ pr: 4 }} />
										{open[index] ? (
											<ExpandLessOutlined />
										) : (
											<ExpandMoreOutlined />
										)}
									</ListItemButton>
								</ListItem>
								{
									<Collapse in={open[index]} timeout="auto" unmountOnExit>
										<List component="div" disablePadding>
											<ListItem key={"Users"}>
												<ListItemButton sx={{ pl: 4 }}>
													<ListItemIcon>
														<AccountBoxOutlined />
													</ListItemIcon>
													<ListItemText primary={"Users"} />
												</ListItemButton>
											</ListItem>
											{index != 0 ? (
												<>
													<ListItem key={"Appointments"}>
														<ListItemButton sx={{ pl: 4 }}>
															<ListItemIcon>
																<VideoCallOutlined />
															</ListItemIcon>
															<ListItemText primary={"Appointments"} />
														</ListItemButton>
													</ListItem>
													<ListItem key={"Schedules"}>
														<ListItemButton sx={{ pl: 4 }}>
															<ListItemIcon>
																<ScheduleOutlined />
															</ListItemIcon>
															<ListItemText primary={"Schedules"} />
														</ListItemButton>
													</ListItem>
												</>
											) : (
												""
											)}
											{index == 0 ? (
												<ListItem key={"Approval"}>
													<ListItemButton sx={{ pl: 4 }}>
														<ListItemIcon>
															<CheckBoxOutlined />
														</ListItemIcon>
														<ListItemText primary={"Approval"} />
													</ListItemButton>
												</ListItem>
											) : (
												""
											)}
										</List>
									</Collapse>
								}
							</Box>
						))}
					</List>
					<Divider />
					<List>
						<ListItem key="Terms of Service">
							<ListItemButton>
								<ListItemText primary="Terms of Service" />
							</ListItemButton>
						</ListItem>
						<ListItem key="Policies">
							<ListItemButton>
								<ListItemText primary="Policies" />
							</ListItemButton>
						</ListItem>
					</List>
				</Box>
			</Drawer>
		</div>
	);
}

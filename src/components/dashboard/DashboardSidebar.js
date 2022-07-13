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
} from "@mui/icons-material";

export default function DashboardSidebar(props) {
	const [openCounselors, setOpenCounselors] = useState(false);
	const [openStudents, setOpenStudents] = useState(false);
	const icons = [
		<SchoolOutlined />,
		<BookmarkOutlined />,
		<ChildCareOutlined />,
	];
	const subicons = [<VideoCallOutlined />, <ScheduleOutlined />];
	const open = [openCounselors, openStudents];
	const handleOnClick = (index) => {
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
										{index == 0 ? (
											""
										) : open[index - 1] ? (
											<ExpandLessOutlined />
										) : (
											<ExpandMoreOutlined />
										)}
									</ListItemButton>
								</ListItem>
								{index == 0 ? (
									""
								) : (
									<Collapse in={open[index - 1]} timeout="auto" unmountOnExit>
										<List component="div" disablePadding>
											{["Appointments", "Schedules"].map(
												(subtext, subindex) => (
													<ListItem key={subtext}>
														<ListItemButton sx={{ pl: 4 }}>
															<ListItemIcon>{subicons[subindex]}</ListItemIcon>
															<ListItemText primary={subtext} />
														</ListItemButton>
													</ListItem>
												)
											)}
										</List>
									</Collapse>
								)}
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

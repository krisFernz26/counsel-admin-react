import React, { useState } from "react";
import {
	Box,
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
	ScheduleOutlined,
	VideoCallOutlined,
	CheckBoxOutlined,
	NoteAltOutlined,
	HomeOutlined,
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
				ModalProps={{
					keepMounted: true,
				}}
			>
				<Box
					sx={{ width: "auto" }}
					role="presentation"
					onClick={props.setSidebar}
					onKeyDown={props.setSidebar}
				>
					<List>
						<ListItem
							key="Close"
							sx={{ display: "flex", justifyContent: "flex-end" }}
						>
							<ListItemButton
								onClick={() => {
									props.toggleSidebar();
								}}
							>
								<ListItemText primary="Close" />
							</ListItemButton>
						</ListItem>
						<ListItem key="Profile">
							<ListItemButton
								onClick={() => {
									props.toggleSidebar();
									props.changePage("profile");
								}}
								disabled={props.currentPage["profile"] ? true : false}
							>
								<ListItemIcon>
									<AccountBoxOutlined />
								</ListItemIcon>
								<ListItemText primary="Profile" />
							</ListItemButton>
						</ListItem>
						<ListItem key="Home">
							<ListItemButton
								onClick={() => {
									props.toggleSidebar();
									props.changePage("landing");
								}}
								disabled={props.currentPage["landing"] ? true : false}
							>
								<ListItemIcon>
									<HomeOutlined />
								</ListItemIcon>
								<ListItemText primary="Home" />
							</ListItemButton>
						</ListItem>
					</List>
					<Divider />
					<List>
						<ListItem key="Admin">
							<ListItemButton
								onClick={() => {
									props.toggleSidebar();
									props.changePage("admin-users");
								}}
								disabled={props.currentPage["admin-users"] ? true : false}
							>
								<ListItemIcon>
									<AccountBoxOutlined />
								</ListItemIcon>
								<ListItemText primary="Admin Users" />
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
									<Collapse
										in={open[index]}
										timeout="auto"
										unmountOnExit
										key={text + "-collabsable"}
									>
										<List
											component="div"
											disablePadding
											key={text + "-sublist"}
										>
											<ListItem key={index + "Users"}>
												<ListItemButton
													sx={{ pl: 4 }}
													onClick={() => {
														props.changePage(text.toLowerCase() + "-users");
														props.toggleSidebar();
													}}
													disabled={
														props.currentPage[text.toLowerCase() + "-users"]
															? true
															: false
													}
												>
													<ListItemIcon>
														<AccountBoxOutlined />
													</ListItemIcon>
													<ListItemText primary={"Users"} />
												</ListItemButton>
											</ListItem>
											{index != 0 ? (
												<>
													<ListItem key={index + "Appointments"}>
														<ListItemButton
															sx={{ pl: 4 }}
															onClick={() => {
																props.changePage(
																	text.toLowerCase() + "-appointments"
																);
																props.toggleSidebar();
															}}
															disabled={
																props.currentPage[
																	text.toLowerCase() + "-appointments"
																]
																	? true
																	: false
															}
														>
															<ListItemIcon>
																<VideoCallOutlined />
															</ListItemIcon>
															<ListItemText primary={"Appointments"} />
														</ListItemButton>
													</ListItem>
													<ListItem key={index + "Notes"}>
														<ListItemButton
															sx={{ pl: 4 }}
															onClick={() => {
																props.changePage(text.toLowerCase() + "-notes");
																props.toggleSidebar();
															}}
															disabled={
																props.currentPage[text.toLowerCase() + "-notes"]
																	? true
																	: false
															}
														>
															<ListItemIcon>
																<NoteAltOutlined />
															</ListItemIcon>
															<ListItemText primary={"Notes"} />
														</ListItemButton>
													</ListItem>
												</>
											) : (
												""
											)}
											{index == 1 ? (
												<ListItem key={index + "Schedules"}>
													<ListItemButton
														sx={{ pl: 4 }}
														onClick={() => {
															props.changePage(
																text.toLowerCase() + "-schedules"
															);
															props.toggleSidebar();
														}}
														disabled={
															props.currentPage[
																text.toLowerCase() + "-schedules"
															]
																? true
																: false
														}
													>
														<ListItemIcon>
															<ScheduleOutlined />
														</ListItemIcon>
														<ListItemText primary={"Schedules"} />
													</ListItemButton>
												</ListItem>
											) : (
												""
											)}
											{index == 0 ? (
												<>
													<ListItem key={index + "all"}>
														<ListItemButton
															sx={{ pl: 4 }}
															onClick={() => {
																props.changePage(text.toLowerCase() + "-all");
																props.toggleSidebar();
															}}
															disabled={
																props.currentPage[text.toLowerCase() + "-all"]
																	? true
																	: false
															}
														>
															<ListItemIcon>
																<CheckBoxOutlined />
															</ListItemIcon>
															<ListItemText primary={"All Institutions"} />
														</ListItemButton>
													</ListItem>
												</>
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
							<ListItemButton
								onClick={() => {
									props.changePage("terms");
									props.toggleSidebar();
								}}
								disabled={props.currentPage["terms"] ? true : false}
							>
								<ListItemText primary="Terms of Service" />
							</ListItemButton>
						</ListItem>
						<ListItem
							key="Policies"
							onClick={() => {
								props.changePage("policies");
								props.toggleSidebar();
							}}
							disabled={props.currentPage["policies"] ? true : false}
						>
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

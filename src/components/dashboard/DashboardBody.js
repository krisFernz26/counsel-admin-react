import React from "react";
import { Box } from "@mui/material";
import Landing from "../landing/Landing";
import Profile from "../profile/Profile";
import AdminBody from "../admin/AdminBody";
import InstitutionUsersBody from "../institution/InstitutionUsersBody";
import InstitutionsBody from "../institution/InstitutionsBody";

export default function DashboardBody(props) {
	return (
		<Box>
			{props.currentPage.landing ? <Landing /> : ""}
			{props.currentPage["profile"] ? <Profile /> : ""}

			{props.currentPage["admin-users"] ? <AdminBody /> : ""}

			{props.currentPage["institutions-users"] ? <InstitutionUsersBody /> : ""}
			{props.currentPage["institutions-all"] ? <InstitutionsBody /> : ""}

			{props.currentPage["counselors-users"] ? <div>Counselors Users</div> : ""}
			{props.currentPage["counselors-appointments"] ? (
				<div>Counselors Appointments</div>
			) : (
				""
			)}
			{props.currentPage["counselors-notes"] ? <div>Counselors Notes</div> : ""}
			{props.currentPage["counselors-schedules"] ? (
				<div>Counselors Schedules</div>
			) : (
				""
			)}
			{props.currentPage["students-users"] ? <div>Students Users</div> : ""}
			{props.currentPage["students-appointments"] ? (
				<div>Students Appointments</div>
			) : (
				""
			)}
			{props.currentPage["students-notes"] ? <div>Students Notes</div> : ""}
			{props.currentPage["terms"] ? <div>Terms of service</div> : ""}
			{props.currentPage["policies"] ? <div>Policies</div> : ""}
		</Box>
	);
}

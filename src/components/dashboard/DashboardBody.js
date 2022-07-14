import React from "react";

export default function DashboardBody(props) {
	return (
		<>
			{props.currentPage.landing ? <div>DashboardBody</div> : ""}
			{props.currentPage["profile"] ? <div>Profile</div> : ""}

			{props.currentPage["institutions-users"] ? (
				<div>Institutions Users</div>
			) : (
				""
			)}

			{props.currentPage["institutions-approval"] ? (
				<div>Institutions Approval</div>
			) : (
				""
			)}

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
		</>
	);
}

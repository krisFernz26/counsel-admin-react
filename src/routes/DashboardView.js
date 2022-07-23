import React, { useState, useContext, useLayoutEffect, useEffect } from "react";
import { CircularProgress, Box } from "@mui/material";
import apiClient from "../services/api";
import "../styles/global.css";
import { Navigate } from "react-router-dom";
import DashboardAppbar from "../components/dashboard/DashboardAppbar";
import DashboardBody from "../components/dashboard/DashboardBody";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";

export default function DashboardView(props) {
	let user = JSON.parse(localStorage.getItem("user"));
	let headers = {};
	let [sidebar, setSidebar] = useState(false);
	let [isLoggedIn, setIsLoggedIn] = useState(true);
	let [loading, setLoading] = useState(false);
	let [error, setError] = useState("");
	let [currentPage, setCurrentPage] = useState({
		landing: true,
	});

	// useLayoutEffect(() => {
	// 	if (user == null) {
	// 		setIsLoggedIn(false);
	// 	} else {
	// 		headers = {
	// 			accept: "application/json",
	// 			Authorization: "Bearer " + user.token,
	// 		};
	// 	}
	// }, []);

	const logout = () => {
		setLoading(true);
		headers = {
			accept: "application/json",
			Authorization: "Bearer " + user.token,
		};
		apiClient
			.get("/api/logout", { headers: headers })
			.then((res) => {
				if (res.status == 200) {
					props.logout();
					setIsLoggedIn(false);
					setLoading(false);
				}
			})
			.catch((e) => {
				setError(e.message);
				setLoading(false);
			});
	};

	const toggleSidebar = () => {
		setSidebar(!sidebar);
	};

	const changePage = (page) => {
		setCurrentPage({ [page]: !currentPage[page] });
	};

	return (
		<div>
			{!isLoggedIn ? (
				<Navigate to="/" />
			) : loading ? (
				<CircularProgress />
			) : (
				<>
					<DashboardAppbar logout={logout} toggleSidebar={toggleSidebar} />
					<DashboardBody
						currentPage={currentPage}
						toggleSidebar={toggleSidebar}
						sidebar={sidebar}
					/>
					{sidebar ? (
						<DashboardSidebar
							currentPage={currentPage}
							toggleSidebar={toggleSidebar}
							sidebar={sidebar}
							changePage={changePage}
						/>
					) : (
						""
					)}
				</>
			)}
		</div>
	);
}

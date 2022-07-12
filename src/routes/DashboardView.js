import React from "react";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import "../styles/global.css";

export default function DashboardView() {
	let user = useContext(UserContext);
	return (
		<div>
			DashboardView
			<p>
				{user.user.first_name} {user.user.last_name}
			</p>
		</div>
	);
}

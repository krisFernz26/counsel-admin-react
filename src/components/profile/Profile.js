import React, { useState } from "react";
import { Avatar } from "@mui/material";
import Moment from "moment";
import "../../styles/global.css";

export default function Profile() {
	let [user, setUser] = useState(JSON.parse(localStorage.getItem("user")).user);
	Moment.locale("en");

	return (
		<div className="body">
			<h3>Admin Profile</h3>
			<Avatar
				alt={user.media.length != 0 ? user.media[0].name : "avatar"}
				src={user.media.length != 0 ? user.media[0].original_url : ""}
			/>
			<h4>
				{user.first_name} {user.last_name}
			</h4>
			<p>
				<b>Registered on:</b> {Moment(user.created_at).format("MMMM Do, YYYY")}
			</p>
			<p>
				<b>Email Address:</b> {user.email}
			</p>
			<p>
				<b>Institution Name:</b> {user.institution.name}
			</p>
		</div>
	);
}

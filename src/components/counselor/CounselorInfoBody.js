import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Moment from "moment";
import apiClient from "../../services/api";
import {
	Box,
	Button,
	ButtonGroup,
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	DialogContentText,
	CircularProgress,
} from "@mui/material";

export default function CounselorInfoBody() {
	const params = useParams();
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);
	const token = JSON.parse(localStorage.getItem("user")).token;
	const headers = {
		accepts: "application/json",
		Authorization: `Bearer ${token}`,
	};
	const getUser = () => {
		apiClient
			.get("/api/users/" + params.id, {
				headers: headers,
			})
			.then((res) => {
				console.log(res.data);
				setUser(res.data);
				setLoading(false);
			});
	};
	useEffect(() => {
		setLoading(true);
		getUser();
	}, []);

	return loading ? (
		<CircularProgress />
	) : (
		// id first_name last_name address birthdate created_at updated_at email email_verified_at username
		// institution(id name address)
		// notes < array > (id subject body created_at updated_at)
		// appointments < array > (id appointment_status_id student_id counselor_id link date start_time end_time created_at updated_at)
		// media
		<Box>{user.first_name + " " + user.last_name}</Box>
		// TODO: Create global component for userinfo, appointments, notes
		// TODO: Create component for counselor schedules
	);
}

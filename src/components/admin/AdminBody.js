import React, { useEffect, useState } from "react";
import AdminTable from "./AdminTable";
import AdminCreateForm from "./AdminCreateForm";
import AdminUpdateForm from "./AdminUpdateForm";
import apiClient from "../../services/api";

export default function AdminBody() {
	const [users, setUsers] = useState([]);
	const [nextPageUrl, setNextPageUrl] = useState("");
	const token = JSON.parse(localStorage.getItem("user")).token;
	const headers = {
		accept: "application/json",
		Authorization: "Bearer " + token,
	};
	useEffect(() => {
		apiClient
			.get("/api/users", {
				headers: headers,
			})
			.then((res) => {
				setUsers(res.data.data);
				setNextPageUrl(res.data.next_page_url);
			});
	}, []);

	const handleNextPage = () => {
		apiClient
			.get(nextPageUrl, {
				headers: headers,
			})
			.then((res) => {
				setUsers(res.data.data);
				setNextPageUrl(res.data.next_page_url);
			});
	};
	return <div>Admin Body</div>;
}

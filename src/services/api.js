import axios from "axios";

const apiClient = axios.create({
	baseURL: "http://localhost:8000",
	withCredentials: true,
	xsrfHeaderName: "X-XSRF-TOKEN",
});

export default apiClient;

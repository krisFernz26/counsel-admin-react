import axios from "axios";

const apiClient = axios.create({
	baseURL: "https://api.sanctum.test",
	withCredentials: true,
	xsrfHeaderName: "X-XSRF-TOKEN",
});

export default apiClient;

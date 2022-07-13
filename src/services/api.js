import axios from "axios";

const apiClient = axios.create({
	baseURL: "https://api-counsel-222.herokuapp.com",
	withCredentials: true,
	xsrfHeaderName: "X-XSRF-TOKEN",
});

export default apiClient;

import "./styles/app.css";
import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import HomeView from "./routes/HomeView";
import LoginView from "./routes/LoginView";
import ContactView from "./routes/ContactView";
import DashboardView from "./routes/DashboardView";

import React from "react";
import CounselorInfoBody from "./components/counselor/CounselorInfoBody";

export default function App() {
	let [isLoggedIn, setIsLoggedIn] = useState(false);
	const login = () => {
		setIsLoggedIn(true);
	};
	const logout = () => {
		localStorage.removeItem("user");
		setIsLoggedIn(false);
	};
	const theme = createTheme({
		palette: {
			primary: {
				light: "#7789b3",
				main: "#495c83",
				dark: "#1c3356",
				contrastText: "#000",
			},
			secondary: {
				light: "#ffffff",
				main: "#fff",
				dark: "#cccccc",
				contrastText: "#000",
			},
		},
	});
	return (
		<HelmetProvider>
			<div className="App">
				<Helmet>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					/>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/icon?family=Material+Icons"
					/>
					<title>Counsel | Admin Dashboard</title>
					<meta name="viewport" content="initial-scale=1, width=device-width" />
				</Helmet>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Routes>
						<Route path="/" element={<HomeView />} />
						<Route path="login" element={<LoginView login={login} />} />
						{/* <Route path="register" element={<RegisterView />} login={login} /> */}
						<Route path="contact" element={<ContactView />} />
						<Route
							path="dashboard"
							element={<DashboardView logout={logout} />}
						/>
						<Route path="counselors/:id" element={<CounselorInfoBody />} />
					</Routes>
				</ThemeProvider>
			</div>
		</HelmetProvider>
	);
}

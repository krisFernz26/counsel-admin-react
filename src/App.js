import "./styles/app.css";
import Helmet from "react-helmet";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import HomeView from "./routes/HomeView";
import LoginView from "./routes/LoginView";
import RegisterView from "./routes/RegisterView";
import ContactView from "./routes/ContactView";

function App() {
	const theme = createTheme({
		palette: {
			primary: {
				light: "#7789b3",
				main: "#495c83",
				dark: "#1c3356",
				contrastText: "#fff",
			},
			secondary: {
				light: "#ffffff",
				main: "#fff",
				dark: "#cccccc",
				contrastText: "#000",
			},
			background: {
				default: "#495c83",
			},
			text: {
				primary: "#fff",
			},
		},
	});
	return (
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
					<Route path="login" element={<LoginView />} />
					<Route path="register" element={<RegisterView />} />
					<Route path="contact" element={<ContactView />} />
				</Routes>
			</ThemeProvider>
		</div>
	);
}

export default App;

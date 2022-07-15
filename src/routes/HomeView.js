import logo from "../logo.svg";
import { Component } from "react";
import { Link } from "react-router-dom";
import { Stack, Button, Divider } from "@mui/material";
import "../styles/global.css";
import "../styles/routes/home/view.css";

class HomeView extends Component {
	render() {
		return (
			<div id="home-view" className="body">
				<header className="App-header">
					{/* Change this logo into the counsel logo */}
					{/* <img src={logo} className="App-logo" alt="logo" /> */}
					<h3>Admin Dashboard</h3>
					<Stack
						direction={{ xs: "column", sm: "row" }}
						spacing={{ xs: 1, sm: 2 }}
					>
						<Button component={Link} to="login" variant="outlined">
							Login
						</Button>
						{/* <Button component={Link} to="register" variant="outlined">
							Register
						</Button> */}
						<Button component={Link} to="contact" variant="outlined">
							Contact Us
						</Button>
					</Stack>
				</header>
			</div>
		);
	}
}

export default HomeView;

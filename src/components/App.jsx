import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import LuxonUtils from "@date-io/luxon";
import history from "../history";

// Custom components
import SignIn from "./pages/SignIn";
import Calendar from "./pages/Calendar";

// Material UI
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

const lightTheme = createTheme({
	palette: {
		type: "light",
		primary: {
			main: "#1976d2",
		},
		secondary: {
			main: "#fff",
		},
	},
	overrides: {
		MuiTableCell: {
			root: {
				//This can be referred from Material UI API documentation.
				padding: "12px 8px",
			},
		},
		MuiTableRow: {
			root: {
				"&:last-child td": {
					borderBottom: 0,
				},
			},
		},
	},
});

function App() {
	return (
		<MuiThemeProvider theme={lightTheme}>
			<CssBaseline>
				<MuiPickersUtilsProvider utils={LuxonUtils}>
					<Router history={history}>
						<Switch>
							<Route path="/" exact>
								<SignIn />
							</Route>
							<Route path="/calendar" exact>
								<Calendar />
							</Route>
							{/* Redirect all none existing routes back to roote route */}
							<Redirect from="/" to="/" />
						</Switch>
					</Router>
				</MuiPickersUtilsProvider>
			</CssBaseline>
		</MuiThemeProvider>
	);
}

export default App;

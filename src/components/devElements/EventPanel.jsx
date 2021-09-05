import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { DateTime } from "luxon";

// Helpers
import dateToISO from "../../helpers/dateToISO";
import GAPI_CLIENT_CONFIG from "../../api/gapiClientConfig";

// Material UI
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
	bottomRight: {
		position: "fixed",
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
	bottomLeft: {
		position: "fixed",
		bottom: theme.spacing(2),
		left: theme.spacing(2),
	},
	topRight: {
		position: "fixed",
		top: theme.spacing(2),
		right: theme.spacing(2),
	},
	topLeft: {
		position: "fixed",
		top: theme.spacing(2),
		left: theme.spacing(2),
	},
	card: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		borderRadius: theme.spacing(1),
		padding: theme.spacing(2),
		position: "fixed",
		// opacity: 0.6,
	},
	button: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(1),
		borderRadius: theme.spacing(1),
	},
}));

function EventPanel({ position }) {
	const classes = useStyles();
	const gapi = window.gapi;

	const cardStyle = clsx({
		[classes.card]: true, // always applies
		[classes.bottomLeft]: position === "bottomLeft",
		[classes.bottomRight]: position === "bottomRight",
		[classes.topLeft]: position === "topLeft",
		[classes.topRight]: position === "topRight",
	});

	// 7 day time frame
	const nowDate = dateToISO(DateTime.now().startOf("day"));
	const weekLaterDate = dateToISO(DateTime.now().plus({ days: 7 }));

	// 30 day time frame
	const days30LaterDate = dateToISO(DateTime.now().plus({ days: 30 }));

	const day1Start = dateToISO(DateTime.now().startOf("day"));
	const day1End = dateToISO(DateTime.now().endOf("day"));

	// Get Events from calendar
	const getEventList = (startDate, endDate) => {
		gapi.client.calendar.events
			.list({
				calendarId: "primary",
				timeMin: startDate,
				timeMax: endDate,
				showDeleted: false,
				singleEvents: true,
				orderBy: "startTime",
			})
			.then((response) => {
				const events = response.result.items;
				console.log("EVENTS: ", events);
			});
	};

	const handleSignOut = () => {
		window.alert("SIGNED OUT (not really)");
	};

	const handleSignIn = () => {
		const { gapi } = window;

		// Sign in
		gapi.auth2
			.getAuthInstance()
			.signIn()
			.then(() => {
				console.log("Signed in with Google account");
			});
	};

	const handleGapiInitialization = () => {
		const { gapi } = window;

		// Load auth2 client
		gapi.load("client:auth2", () => {
			console.log("Loaded Google API auth2 client");

			// Initialize Google API client
			gapi.client.init(GAPI_CLIENT_CONFIG);

			//  Load calendar
			gapi.client.load("calendar", "v3", () => {
				console.log("Loaded Google API calendar v3");
			});
		});
	};

	return (
		<Card className={cardStyle} raised>
			<Button
				className={classes.button}
				variant="contained"
				fullWidth
				onClick={() =>
					console.log(window.gapi.auth2.getAuthInstance().isSignedIn.get())
				}
			>
				Check Login Status
			</Button>
			<Button
				className={classes.button}
				variant="contained"
				color="primary"
				fullWidth
				onClick={() => getEventList(nowDate, weekLaterDate)}
			>
				List event (7)
			</Button>
			<Button
				className={classes.button}
				variant="contained"
				color="primary"
				fullWidth
				onClick={() => getEventList(nowDate, days30LaterDate)}
			>
				List event (30)
			</Button>
			<Button
				className={classes.button}
				variant="contained"
				color="primary"
				fullWidth
				onClick={() => getEventList(day1Start, day1End)}
			>
				List event (1)
			</Button>
			<Button
				className={classes.button}
				variant="contained"
				fullWidth
				onClick={handleSignOut}
			>
				Sign out
			</Button>
			<Button
				className={classes.button}
				variant="contained"
				color="secondary"
				fullWidth
				onClick={handleGapiInitialization}
			>
				Initialize
			</Button>
			<Button
				className={classes.button}
				variant="contained"
				color="secondary"
				fullWidth
				onClick={handleSignIn}
			>
				Sign In
			</Button>
		</Card>
	);
}

EventPanel.propTypes = {
	position: PropTypes.string,
};

EventPanel.defaultProps = {
	position: "topLeft",
};

export default EventPanel;

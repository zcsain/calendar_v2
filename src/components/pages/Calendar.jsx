import React, { useState, useEffect } from "react";

// Custom
import CalendarViewSelector from "../elements/CalendarViewSelector";
import AddEventDialog from "../elements/AddEventDialog";

// Testing
import EventList from "../elements/EventList";
import eventList from "../../mockdata/eventList";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
	container: {
		marginTop: theme.spacing(3),
	},
}));

function Calendar() {
	const classes = useStyles();
	const [selectedViewType, setSelectedViewType] = useState(7);
	const [calendarData, setCalendarData] = useState([]);

	useEffect(() => {
		if (window.gapi.auth2) {
			console.log("User is signed in to calendar");
		} else {
			console.log(
				"User is not signed in to calendar, redirecting to sign in page"
			);
			// ADD REDIRECT TO SIGN IN PAGE HERE
		}
	});

	const testEvent = () => {
		return (
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<EventList events={eventList} />
			</Grid>
		);
	};

	return (
		<React.Fragment>
			<p>Calendar</p>

			<Container className={classes.container}>
				<Grid container spacing={3} justifyContent="center">
					{testEvent()}
				</Grid>
			</Container>
			<CalendarViewSelector setSelectedViewType={setSelectedViewType} />
			<AddEventDialog />
		</React.Fragment>
	);
}

export default Calendar;

import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";

// Custom
import CalendarViewSelector from "../elements/CalendarViewSelector";
import AddEventDialog from "../elements/AddEventDialog";
import dateToISO from "../../helpers/dateToISO";
import chunkEventsV2 from "../../helpers/chunkEventsV2";

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
	const [chunkedCalendarData, setChunkedCalendarData] = useState([]);

	// Get Events from calendar
	const getEventList = (startDate, endDate, updateState) => {
		window.gapi.client.calendar.events
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
				console.log("Events recieived");
				updateState(events);
			});
	};

	// Fetch 1 day worth of events
	const fetch1 = () => {
		const day1Start = dateToISO(DateTime.now().startOf("day"));
		const day1End = dateToISO(DateTime.now().endOf("day"));

		getEventList(day1Start, day1End, setCalendarData);
	};

	// Fetch 7 days worth of events
	const fetch7 = () => {
		const nowDate = dateToISO(DateTime.now().startOf("day"));
		const weekLaterDate = dateToISO(DateTime.now().plus({ days: 7 }));

		getEventList(nowDate, weekLaterDate, setCalendarData);
	};

	const fetch30 = () => {
		const nowDate = dateToISO(DateTime.now().startOf("day"));
		const days30LaterDate = dateToISO(DateTime.now().plus({ days: 30 }));

		getEventList(nowDate, days30LaterDate, setCalendarData);
	};

	const handleEventFetch = () => {
		if (selectedViewType === 1) {
			fetch1();
		} else if (selectedViewType === 7) {
			fetch7();
		} else if (selectedViewType === 30) {
			fetch30();
		}
	};

	// Checks if user is signed in (if gapi exists)
	// not signed in - redirects to sign in page
	// signed in - continues
	useEffect(() => {
		if (window.gapi.auth2) {
			console.log("User is signed in to calendar");
		} else {
			console.log(
				"User is not signed in to calendar, redirecting to sign in page"
			);
			// ADD REDIRECT TO SIGN IN PAGE HERE
		}

		return () => {
			// SIGN OUT USER
			console.log("User signed out (not really)");
			// IF THIS IS USED, useEffect SHOULD ONLY RUN ONCE -> []
		};
	}, []);

	// useEffect are called in the order they appear in code (just like state)
	// so order is important
	useEffect(() => {
		handleEventFetch();
		console.log("Fetching events");
	}, [selectedViewType]);

	useEffect(() => {
		const chunked = chunkEventsV2(calendarData, selectedViewType);

		setChunkedCalendarData(chunked);

		console.log("Events chunked");
	}, [calendarData]);

	const testEvent = () => {
		return (
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<EventList events={eventList} viewType={selectedViewType} />
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

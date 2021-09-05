import React, { useState } from "react";
import { DateTime } from "luxon";

// Custom
import FloatingButton from "./FloatingButton";
import dateToISO from "../../helpers/dateToISO";

// Material UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import { KeyboardDateTimePicker } from "@material-ui/pickers";

function AddEventDialog({ resetState }) {
	const [open, setOpen] = useState(false);
	const [startDate, setStartDate] = useState(DateTime.now());
	const [endDate, setEndDate] = useState(DateTime.now().plus({ hours: 1 }));
	const [title, setTitle] = useState("");

	// RESET STATE SO UP TO DATE DATA CAN BE FETCHED

	const handleStartDateChange = (date) => {
		setStartDate(date);
		setEndDate(date.plus({ hours: 1 }));
	};

	const handleEndDateChange = (date) => {
		setEndDate(date);
	};

	const handleTitleChange = (event) => {
		setTitle(event.target.value);
	};

	// Open dialog
	const handleClickOpen = () => {
		setOpen(true);

		// Initialize time to current time, title to empty string
		setStartDate(DateTime.now());
		setEndDate(DateTime.now().plus({ hours: 1 }));
		setTitle("");
	};

	// Close dialog
	const handleClose = () => {
		setOpen(false);
	};

	// Add event
	const handleSubmit = () => {
		handleAddEvent(title, startDate, endDate);

		handleClose();

		if (resetState) {
			resetState();
		}
	};

	const handleAddEvent = (title, startTime, endTime) => {
		console.log("Title: ", title);
		console.log("StartTime: ", startTime.toISO());
		console.log("EndTime: ", endTime.toISO());

		const { gapi } = window;

		// Check if user is still signed in, if yes add event, if no redirect to SignIn page
		if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
			console.log("Can't add event, user is not signed in");
			// ADD REDIRECT TO SIGN IN PAGE HERE
		} else {
			// Define event object
			const event = {
				summary: title,
				start: {
					dateTime: dateToISO(startTime),
				},
				end: {
					dateTime: dateToISO(endTime),
				},
				reminders: {
					useDefault: true,
				},
			};

			// Create add event request
			const request = gapi.client.calendar.events.insert({
				calendarId: "primary",
				resource: event,
			});

			// Execute add event request
			request.execute((event) => {
				console.log("Event added");
			});
		}
	};

	// Title input and start/end time pickers
	const displayPickers = () => {
		return (
			<Grid container justifyContent="center" spacing={2}>
				<Grid item xs={12}>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Event Title"
						value={title}
						onChange={handleTitleChange}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<KeyboardDateTimePicker
						ampm={false}
						label="Event Start"
						value={startDate}
						onChange={handleStartDateChange}
						disablePast
						format="dd/MM/yyyy HH:mm"
					/>
				</Grid>
				<Grid item xs={12}>
					<KeyboardDateTimePicker
						ampm={false}
						label="Event End"
						value={endDate}
						onChange={handleEndDateChange}
						disablePast
						format="dd/MM/yyyy HH:mm"
					/>
				</Grid>
			</Grid>
		);
	};

	return (
		<div>
			<FloatingButton
				icon={<AddIcon />}
				color="primary"
				position="bottomRight"
				onClick={handleClickOpen}
			>
				Event
			</FloatingButton>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">New Event</DialogTitle>
				<DialogContent>{displayPickers()}</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleSubmit} color="primary">
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default AddEventDialog;

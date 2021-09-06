import React from "react";
import { DateTime } from "luxon";

// Helpers
import isoToTime24Simple from "../../helpers/isoToTime24Simple";

// Material UI
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

function Event({
	title,
	id,
	startDate,
	endDate,
	viewType = 7,
	onCalendarDataChange,
}) {
	const startTime = isoToTime24Simple(startDate);
	const endTime = isoToTime24Simple(endDate);
	const weekAddition =
		viewType === 30 ? DateTime.fromISO(startDate).toFormat("ccc, DD, ") : "";

	const handleDelete = (id) => {
		if (window.gapi.auth2) {
			if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
				window.gapi.client.calendar.events
					.delete({
						calendarId: "primary",
						eventId: id,
					})
					.then((response) => {
						console.log("Event deleted");
						onCalendarDataChange({
							action: "Event deleted",
							dateTime: DateTime.now().toISO(),
						});
					});
			} else {
				console.log("User is not singed in, redirecting to sing in page");
			}
		} else {
			console.log("Gapi not initialized, redirecting to sing in page");
		}
	};

	return (
		<ListItem>
			<ListItemText
				primary={title}
				secondary={weekAddition + startTime + " - " + endTime}
			/>
			<ListItemSecondaryAction>
				<IconButton
					edge="end"
					arial-label="delete"
					onClick={() => handleDelete(id)}
				>
					<DeleteIcon />
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	);
}

export default Event;

import React from "react";

// Helpers
import isoToTime24Simple from "../../helpers/isoToTime24Simple";

// Material UI
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

function Event({ title, id, startDate, endDate }) {
	const startTime = isoToTime24Simple(startDate);
	const endTime = isoToTime24Simple(endDate);

	const handleDelete = (id) => {
		window.gapi.client.calendar.events
			.delete({
				calendarId: "primary",
				eventId: id,
				sendUpdates: "all",
			})
			.then((response) => {
				console.log(response);
				console.log("Event deleted");
			});
		// console.log(id);
	};

	return (
		<ListItem>
			<ListItemText primary={title} secondary={startTime + " - " + endTime} />
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

import React from "react";

// Custom components
import Event from "./Event";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

// Helpers
import { DateTime } from "luxon";

const useStyles = makeStyles((theme) => ({
	card: {
		backgroundColor: theme.palette.background.paper,
		borderRadius: theme.spacing(1),
	},
	list: {
		overflow: "auto",
		maxHeight: 410,
		height: 410,
	},
	day: {
		padding: theme.spacing(1, 2, 1),
		backgroundColor: theme.palette.primary.main,
		color: "white",
	},
}));

function EventListV2({ chunk, viewType, onCalendarDataChange }) {
	const classes = useStyles();
	const { date, events } = chunk;
	let listTitle;

	if (viewType === 1 || viewType === 7) {
		listTitle = DateTime.fromISO(date).toFormat("cccc, DD");
	} else if (viewType === 30) {
		listTitle = "Week " + DateTime.fromISO(date).toFormat("W");
	}

	return (
		<Card className={classes.card} raised>
			<Typography variant="h6" className={classes.day}>
				{listTitle}
			</Typography>
			<List className={classes.list} dense>
				{events.length === 0
					? null
					: events.map((event) => {
							const { id, summary, start, end } = event;
							const { dateTime: startDateISO } = start;
							const { dateTime: endDateISO } = end;

							return (
								<Event
									key={id}
									title={summary}
									id={id}
									startDate={startDateISO}
									endDate={endDateISO}
									viewType={viewType}
									onCalendarDataChange={onCalendarDataChange}
								/>
							);
					  })}
			</List>
		</Card>
	);
}

export default EventListV2;

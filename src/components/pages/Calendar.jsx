import React, { useState, useEffect } from "react";

// Custom
import CalendarViewSelector from "../elements/CalendarViewSelector";

function Calendar() {
	const [selectedViewType, setSelectedViewType] = useState(7);

	useEffect(() => {
		if (window.gapi.auth2) {
			console.log("User is signed in to calendar");
		} else {
			console.log("User is not signed in to calendar");
		}
	});

	return (
		<React.Fragment>
			<p>Calendar</p>
			<CalendarViewSelector setSelectedViewType={setSelectedViewType} />
		</React.Fragment>
	);
}

export default Calendar;

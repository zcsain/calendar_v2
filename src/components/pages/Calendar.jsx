import React, { useState } from "react";

// Custom
import CalendarViewSelector from "../elements/CalendarViewSelector";

function Calendar() {
	const [selectedViewType, setSelectedViewType] = useState(7);

	return (
		<React.Fragment>
			<p>Calendar</p>
			<CalendarViewSelector setSelectedViewType={setSelectedViewType} />
		</React.Fragment>
	);
}

export default Calendar;

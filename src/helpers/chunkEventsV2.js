import { DateTime } from "luxon";

const chunkToDay = (rawEvets) => {
	const startDate = DateTime.now().startOf("day");

	return { date: startDate.toISO(), events: rawEvets };
};

// Chunks a list of events into days, starting from today
const chunkToWeekday = (rawEvets) => {
	const startDate = DateTime.now().startOf("day");
	let latestWeekday = startDate.weekday;
	let dayOffset = 0;
	let counter = 7;
	let chunked = [];

	function filterCallback(targetWeekday) {
		return function (event) {
			let currentEventWeekday = DateTime.fromISO(event.start.dateTime).weekday;

			return currentEventWeekday === targetWeekday;
		};
	}

	while (counter > 0) {
		let chunk = rawEvets.filter(filterCallback(latestWeekday));

		chunked.push({
			date: startDate.plus({ days: dayOffset }).toISO(),
			events: chunk,
		});

		dayOffset++;
		counter--;
		latestWeekday = (latestWeekday % 7) + 1;
	}

	return chunked;
};

// Chunks a list of events into weeks (5 weeks in total, determined by maxWeekOffset)
const chunkToWeeks = (rawEvets) => {
	const startDate = DateTime.now().startOf("day");
	const startWeek = startDate.weekNumber;
	let chunked = [];
	const maxWeekOffset = 4;

	function filterCallback(targetWeek) {
		return function (event) {
			let currentEventWeek = DateTime.fromISO(event.start.dateTime).weekNumber;

			return currentEventWeek === targetWeek;
		};
	}

	for (let weekOffset = 0; weekOffset <= maxWeekOffset; weekOffset++) {
		let chunk = rawEvets.filter(filterCallback(startWeek + weekOffset));

		chunked.push({
			date: startDate.plus({ weeks: weekOffset }).toISO(),
			events: chunk,
		});
	}

	return chunked;
};

/**
 *
 * @param {array} rawEvets Array of Google Calendar events (ordered by start time)
 * @param {number} viewType Type of view that is selected (1, 7, 52) is equivalent to (1, 7, 30) days
 * @returns Array of objects chunked into days (or weeks), conatining start date of day (or week) and events belonging to that day (or week)
 */

const chunkEventsV2 = (rawEvets, viewType) => {
	// Array to store event chunks (array of objects)
	let chunked = [];

	// Chunk events based on view type
	if (viewType === 1) {
		return chunkToDay(rawEvets);
	} else if (viewType === 7) {
		return chunkToWeekday(rawEvets, viewType);
	} else if (viewType === 30) {
		return chunkToWeeks(rawEvets);
	}

	return chunked;
};

export default chunkEventsV2;

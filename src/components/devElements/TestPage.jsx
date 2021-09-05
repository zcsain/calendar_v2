import React from "react";

import EventPanel from "./EventPanel";
import chunkEventsV2 from "../../helpers/chunkEventsV2";
import Button from "@material-ui/core/Button";

import eventsList30 from "../../mockdata/eventList";
import eventList7 from "../../mockdata/eventList7";
import eventList1 from "../../mockdata/eventList1";

function TestPage() {
	const handleChunking = (list, viewType) => {
		console.time("doSomething");

		const chunked = chunkEventsV2(list, viewType);
		console.log(chunked);

		console.timeEnd("doSomething");
	};

	return (
		<div>
			<h1>I am test page</h1>
			<EventPanel position="bottomLeft" />
			<Button
				onClick={() => handleChunking(eventList1, 1)}
				variant="contained"
				color="primary"
			>
				Chunk 1
			</Button>
			<Button
				onClick={() => handleChunking(eventList7, 7)}
				variant="contained"
				color="primary"
			>
				Chunk 7
			</Button>
			<Button
				onClick={() => handleChunking(eventsList30, 30)}
				variant="contained"
				color="primary"
			>
				Chunk 30
			</Button>
		</div>
	);
}

export default TestPage;

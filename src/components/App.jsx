import React from "react";

// Custom components
import SignIn from "./pages/SignIn";
import Calendar from "./pages/Calendar";

function App() {
	return (
		<React.Fragment>
			<p>App component</p>
			<SignIn />
			<Calendar />
		</React.Fragment>
	);
}

export default App;

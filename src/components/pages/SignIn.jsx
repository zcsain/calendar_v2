import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

// Custom
import SignInCard from "../elements/SignInCard";
import GAPI_CLIENT_CONFIG from "../../api/gapiClientConfig";

// Material UI
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		width: "100vw",
		height: "100vh",
		alignItems: "center",
	},
}));

function SignIn() {
	const classes = useStyles();
	const history = useHistory();

	const handleGapiInitialization = () => {
		const { gapi } = window;

		// Load auth2 client
		gapi.load("client:auth2", () => {
			console.log("Loaded Google API auth2 client");

			// Initialize Google API client
			gapi.client.init(GAPI_CLIENT_CONFIG);

			//  Load calendar
			gapi.client.load("calendar", "v3", () => {
				console.log("Loaded Google API calendar v3");
			});
		});
	};

	const handleSignIn = () => {
		const { gapi } = window;

		// Sign in
		gapi.auth2
			.getAuthInstance()
			.signIn()
			.then(() => {
				console.log("Signed in with Google account");

				// Redirect to Calendar page
				history.push("/calendar");
			});
	};

	useEffect(() => {
		handleGapiInitialization();
	}, []);

	return (
		<Container className={classes.container} maxWidth="xs">
			<SignInCard
				description="To access your calendar sign in using your Google account"
				title={"Sign in"}
				buttonText={"Sign in with google"}
				onButtonClick={handleSignIn}
			/>
		</Container>
	);
}

export default SignIn;

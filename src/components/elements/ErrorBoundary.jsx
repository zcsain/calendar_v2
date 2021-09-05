import React from "react";

// Custom
import ErrorPage from "../pages/ErrorPage";

class ErrorBoundary extends React.Component {
	state = {
		hasError: false,
		error: { message: "", stack: "" },
		info: { componentStack: "" },
	};

	static getDerivedStateFromError = (error) => {
		return { hasError: true };
	};

	componentDidCatch = (error, info) => {
		this.setState({ error, info });
	};

	render() {
		const { hasError, error, info } = this.state;
		console.log(error, info);
		const { children } = this.props;

		return hasError ? (
			<ErrorPage
				title={"Oooops..."}
				description={
					"Something went wrong, please go to the Sign In page and try again"
				}
				buttonText={"To sign in page"}
				url={"/"}
			/>
		) : (
			children
		);
	}
}

export default ErrorBoundary;

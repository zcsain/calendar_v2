import React from "react";
import { useHistory } from "react-router-dom";

// Material UI
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		width: "100vw",
		height: "100vh",
		alignItems: "center",
	},
	card: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		borderRadius: theme.spacing(1),
		padding: theme.spacing(2),
	},
	avatar: {
		marginTop: theme.spacing(2),
		backgroundColor: theme.palette.error.main,
	},
	display: {
		margin: theme.spacing(2),
	},
	button: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(1),
		borderRadius: theme.spacing(1),
	},
	description: {
		backgroundColor: "rgba(211, 211, 211, 0.35)",
		padding: theme.spacing(1.5),
		borderRadius: theme.spacing(1),
	},
	title: {
		margin: theme.spacing(2, 0, 4, 0),
	},
}));

function ErrorPage({ title, description, buttonText, url }) {
	const classes = useStyles();
	const history = useHistory();

	const handleClick = () => {
		history.push(url);
	};

	return (
		<Container className={classes.container} maxWidth="xs">
			<Card className={classes.card} raised>
				<Avatar className={classes.avatar}>
					<ErrorOutlineIcon />
				</Avatar>
				<Typography className={classes.title} component="h1" variant="h5">
					{title}
				</Typography>
				<Typography
					className={classes.description}
					variant="body1"
					align="center"
				>
					{description}
				</Typography>
				<Button
					className={classes.button}
					variant="contained"
					color="default"
					fullWidth
					onClick={handleClick}
				>
					{buttonText}
				</Button>
			</Card>
		</Container>
	);
}

export default ErrorPage;

import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles((theme) => ({
	bottomRight: {
		position: "fixed",
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
	bottomLeft: {
		position: "fixed",
		bottom: theme.spacing(2),
		left: theme.spacing(2),
	},
	topRight: {
		position: "fixed",
		top: theme.spacing(2),
		right: theme.spacing(2),
	},
	topLeft: {
		position: "fixed",
		top: theme.spacing(2),
		left: theme.spacing(2),
	},
	extendedIcon: {
		marginRight: theme.spacing(1),
		marginTop: theme.spacing(0.5),
	},
}));

// Renders a button with and icon, that is fixed to one corner of the window,

function FloatingButton({ icon, children, onClick, position, color }) {
	const classes = useStyles();

	const buttonPosition = clsx({
		[classes.bottomLeft]: position === "bottomLeft",
		[classes.bottomRight]: position === "bottomRight",
		[classes.topLeft]: position === "topLeft",
		[classes.topRight]: position === "topRight",
	});

	return (
		<div className={buttonPosition}>
			<Fab variant="extended" color={color} onClick={onClick}>
				<span className={classes.extendedIcon}>{icon}</span>
				{children}
			</Fab>
		</div>
	);
}

FloatingButton.propTypes = {
	position: PropTypes.string,
	color: PropTypes.string,
};

FloatingButton.defaultProps = {
	position: "right",
	color: "primary",
};

export default FloatingButton;

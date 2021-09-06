import React, { useState } from "react";

// Custom
import FloatingButton from "./FloatingButton";

// Material UI
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

// Renders a button to select different types of view for the calendar
// (1 day, 7 days and 30 days views available)
function CalendarViewSelector({ setSelectedViewType }) {
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedView, setSelectedView] = useState(1);
	const viewTypeNames = ["1 day", "7 days", "30 days"];
	const viwTypeCodes = [1, 7, 30];

	// Handles menu clicks
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	// Handles menu close
	const handleClose = () => {
		setAnchorEl(null);
	};

	// Handles item selection in menu
	const handleItemClick = (event, index) => {
		setSelectedView(index);
		setSelectedViewType(viwTypeCodes[index]);

		handleClose();
	};

	return (
		<div>
			<FloatingButton
				onClick={handleClick}
				position="bottomLeft"
				icon={<ExpandMoreIcon />}
			>
				{viewTypeNames[selectedView]}
			</FloatingButton>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{viewTypeNames.map((item, index) => {
					return (
						<MenuItem
							key={item}
							onClick={(event) => handleItemClick(event, index)}
							selected={index === selectedView}
						>
							{item}
						</MenuItem>
					);
				})}
			</Menu>
		</div>
	);
}

export default CalendarViewSelector;

import React, { useState } from "react";
import SideBar from "react-sidebar";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";
import IconButton from "../IconButton";
import Menu from "../Menu";

interface IProps {}

const SideBarMenuPresenter: React.FC<IProps> = () => {
	const [openStatus, setOpenStatus] = useState(false);

	const sidebarStyle = {
		backgroundColor: "white",
		width: "70%",
		zIndex: "10"
	};
	const menuIconStyle = {
		left: "1vw",
		top: "15px"
	};

	return (
		<React.Fragment>
			<SideBar
				sidebar={<Menu />}
				open={openStatus}
				onSetOpen={() => setOpenStatus(!openStatus)}
				styles={{ sidebar: sidebarStyle }}
			>
				<React.Fragment />
			</SideBar>
			<IconButton
				onClick={() => setOpenStatus(!openStatus)}
				style={menuIconStyle}
			>
				<MenuIcon />
			</IconButton>
		</React.Fragment>
	);
};

export default SideBarMenuPresenter;

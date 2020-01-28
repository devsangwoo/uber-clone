import React from "react";
// import SideBar from "react-sidebar";
// import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";
import DriverHome from "../../Components/DriverHome";
// import IconButton from "../../Components/IconButton";
import Maps from "../../Components/Maps";
// import Menu from "../../Components/Menu";
import PassengerHome from "../../Components/PassengerHome";
import { GetCurrentUser } from "../../types/api";
import { ICoords } from "../../utils/mapHelpers";
import * as S from "./HomeStyle";

interface IProps {
	map?: google.maps.Map<Element>;
	userMarker?: google.maps.Marker;
	userCoords: ICoords;
	userData?: GetCurrentUser;
	openStatus: boolean;
	toggleSideBar: () => void;
	setMap: React.Dispatch<
		React.SetStateAction<google.maps.Map<Element> | undefined>
	>;
}

const HomePresenter: React.FC<IProps> = ({
	map,
	userMarker,
	userCoords,
	userData: { GetCurrentUser: { user = {} } = {} } = {},
	openStatus,
	toggleSideBar,
	setMap
}) => {
	// const sidebarStyle = {
	// 	backgroundColor: "white",
	// 	width: "70%",
	// 	zIndex: "10"
	// };

	// const menuIconStyle = {
	// 	left: "1vw",
	// 	position: "relative",
	// 	top: "15px",
	// 	zIndex: "5"
	// };

	return (
		<S.Contaier>
			{/* <SideBar
				sidebar={<Menu />}
				open={openStatus}
				onSetOpen={toggleSideBar}
				styles={{ sidebar: sidebarStyle }}
			>
				<IconButton onClick={toggleSideBar} style={menuIconStyle}>
					<MenuIcon />
				</IconButton>
			</SideBar> */}
			{user!.isDriving ? (
				<DriverHome />
			) : (
				<PassengerHome
					map={map}
					userMarker={userMarker}
					userCoords={userCoords}
				/>
			)}
			<Maps setMap={setMap} isHome={true} />
		</S.Contaier>
	);
};

export default HomePresenter;

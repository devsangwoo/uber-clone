import React from "react";
import SideBar from "react-sidebar";
import { ReactComponent as AddIcon } from "../../assets/icons/add.svg";
import { ReactComponent as AddEmptyIcon } from "../../assets/icons/addEmpty.svg";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";
import AddressBar from "../../Components/AddressBar";
import Form from "../../Components/Form";
import IconButton from "../../Components/IconButton";
import Maps from "../../Components/Maps";
import Menu from "../../Components/Menu";
import { ICoords } from "./HomeContainer";
import * as S from "./HomeStyle";

interface IProps {
	openStatus: boolean;
	toggleSideBar: () => void;
	address: string;
	onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	map: google.maps.Map<Element> | undefined;
	setMap: React.Dispatch<
		React.SetStateAction<google.maps.Map<Element> | undefined>
	>;
	findAddressByInput: any;
	onClickHandlerByAddMode: any;
	addMode: boolean;
	userCoords: ICoords;
}

const HomePresenter: React.FC<IProps> = ({
	openStatus,
	toggleSideBar,
	address,
	onInputChange,
	map,
	setMap,
	findAddressByInput,
	addMode,
	onClickHandlerByAddMode,
	userCoords
}) => {
	const sidebarStyle = {
		backgroundColor: "white",
		width: "70%",
		zIndex: "2"
	};
	const menuIconStyle = { top: "15px", left: "1vw" };
	const addIconStyle = { top: "15px", right: "1vw" };

	return (
		<S.Contaier>
			<SideBar
				sidebar={<Menu />}
				open={openStatus}
				onSetOpen={toggleSideBar}
				styles={{ sidebar: sidebarStyle }}
			>
				<IconButton onClick={toggleSideBar} style={menuIconStyle}>
					<MenuIcon />
				</IconButton>
			</SideBar>
			<IconButton onClick={onClickHandlerByAddMode} style={addIconStyle}>
				{addMode ? <AddIcon /> : <AddEmptyIcon />}
			</IconButton>
			<Form submitFn={findAddressByInput}>
				<AddressBar value={address} onChange={onInputChange} />
			</Form>
			{addMode && <S.Center>📍</S.Center>}
			<Maps map={map} setMap={setMap} userCoords={userCoords} />
		</S.Contaier>
	);
};

export default HomePresenter;

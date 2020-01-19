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
import { GetCurrentUser } from "../../types/api";
import * as S from "./HomeStyle";

interface IProps {
	userData?: GetCurrentUser;
	openStatus: boolean;
	toggleSideBar: () => void;
	setMap: React.Dispatch<
		React.SetStateAction<google.maps.Map<Element> | undefined>
	>;
	address: string;
	onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	findAddressByInput: any;
	onClickHandlerByAddMode: any;
	addMode: boolean;
	reqButtonShow: boolean;
	price: number;
	requestRideMutation: any;
}

const HomePresenter: React.FC<IProps> = ({
	userData: { GetCurrentUser: { user = {} } = {} } = {},
	openStatus,
	toggleSideBar,
	setMap,
	address,
	onInputChange,
	findAddressByInput,
	addMode,
	onClickHandlerByAddMode,
	reqButtonShow,
	price,
	requestRideMutation
}) => {
	const sidebarStyle = {
		backgroundColor: "white",
		width: "70%",
		zIndex: "3"
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
			{user && !user.isDriving && (
				<React.Fragment>
					<IconButton
						onClick={onClickHandlerByAddMode}
						style={addIconStyle}
					>
						{addMode ? <AddIcon /> : <AddEmptyIcon />}
					</IconButton>
					<Form submitFn={findAddressByInput}>
						<AddressBar value={address} onChange={onInputChange} />
					</Form>
					{addMode && <S.Center>📍</S.Center>}
					{reqButtonShow && (
						<S.RequestButton
							onClick={requestRideMutation}
							value={`Request a Ride($${price})`}
						/>
					)}
				</React.Fragment>
			)}
			<Maps setMap={setMap} />
		</S.Contaier>
	);
};

export default HomePresenter;

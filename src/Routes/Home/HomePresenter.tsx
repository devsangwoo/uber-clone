import React from "react";
import SideBar from "react-sidebar";
import { ReactComponent as AddIcon } from "../../assets/icons/add.svg";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";
import AddressBar from "../../Components/AddressBar";
import IconButton from "../../Components/IconButton";
import Maps from "../../Components/Maps";
import Menu from "../../Components/Menu";
import * as S from "./HomeStyle";

interface IProps {
	openStatus: boolean;
	toggleSideBar: () => void;
	address: string;
	onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HomePresenter: React.FC<IProps> = ({
	openStatus,
	toggleSideBar,
	address,
	onInputChange
}) => {
	return (
		<S.Contaier>
			<SideBar
				sidebar={<Menu />}
				open={openStatus}
				onSetOpen={toggleSideBar}
				styles={{
					sidebar: {
						backgroundColor: "white",
						width: "70%",
						zIndex: "2"
					}
				}}
			/>
			<IconButton
				onClick={toggleSideBar}
				style={{ top: "15px", left: "1vw" }}
			>
				<MenuIcon />
			</IconButton>
			<IconButton
				onClick={toggleSideBar}
				style={{ top: "15px", right: "1vw" }}
			>
				<AddIcon />
			</IconButton>
			<AddressBar
				name={""}
				value={address}
				onBlur={() => {}}
				onChange={onInputChange}
			/>
			<Maps />
		</S.Contaier>
	);
};

export default HomePresenter;

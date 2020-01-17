import React from "react";
import SideBar from "react-sidebar";
import Menu from "../../Components/Menu";
import { GetCurrentUser_GetCurrentUser_user } from "../../types/api";
// import * as S from "./HomeStyle";

interface IProps {
	openStatus: boolean;
	toggleSideBar: () => void;
}

const HomePresenter: React.FC<IProps> = ({ openStatus, toggleSideBar }) => {
	return (
		// <S.Contaier>
		<SideBar
			sidebar={<Menu />}
			open={openStatus}
			onSetOpen={toggleSideBar}
			styles={{
				sidebar: {
					backgroundColor: "white",
					width: "70%"
					// zIndex: "10"
				}
			}}
		>
			<button onClick={toggleSideBar}>sidebar</button>
		</SideBar>
		// </S.Contaier>
	);
};

export default HomePresenter;

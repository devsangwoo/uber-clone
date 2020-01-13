import React from "react";
import SideBar from "react-sidebar";
import * as S from "./HomeStyle";

interface IProps {
	openStatus: boolean;
	toggleSideBar: () => void;
}

const HomePresenter: React.FC<IProps> = ({ openStatus, toggleSideBar }) => {
	return (
		<S.Contaier>
			<SideBar
				sidebar={<h1>sidebar</h1>}
				open={openStatus}
				onSetOpen={toggleSideBar}
				styles={{
					sidebar: {
						backgroundColor: "white",
						width: "80%",
						zIndex: "10"
					}
				}}
			>
				<button onClick={toggleSideBar}>close</button>
			</SideBar>
		</S.Contaier>
	);
};

export default HomePresenter;

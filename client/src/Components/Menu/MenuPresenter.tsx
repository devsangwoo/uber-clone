import React from "react";
import { Link } from "react-router-dom";
import Routes from "../../Routes/routes";
import * as S from "./MenuStyle";

interface IProps {
	data?: any;
	toggleDrivingFn: any;
	logout: any;
}

const MenuPresenter: React.FC<IProps> = ({
	data: { GetCurrentUser: { user = null } = {} } = {},
	toggleDrivingFn,
	logout
}) => {
	return (
		<S.Container>
			{user && user.fullName && (
				<React.Fragment>
					<S.Header>
						<S.Grid>
							<Link to={Routes.EDIT_ACCOUNT}>
								<S.Image
									src={
										user.profilePhoto ||
										"https://simpleicon.com/wp-content/uploads/user1.svg"
									}
								/>
							</Link>
							<S.Text>
								<S.Name>{user.fullName}</S.Name>
								<S.Rating>4.5</S.Rating>
							</S.Text>
						</S.Grid>
					</S.Header>
					<S.LinkExtend to={Routes.PLACES}>Places</S.LinkExtend>
					<S.LinkExtend
						to={{
							pathname: Routes.RIDE_HISTORY,
							state: { isDriver: user.isDriving }
						}}
					>
						Trips
					</S.LinkExtend>
					<S.LinkExtend to={Routes.SETTING}>Settings</S.LinkExtend>
					<S.ToggleDriving
						onClick={toggleDrivingFn}
						isDriving={user.isDriving}
					>
						{user.isDriving ? "Stop driving" : "Start driving"}
					</S.ToggleDriving>
					<S.ButtonExtend value={"SIGN OUT"} onClick={logout} />
				</React.Fragment>
			)}
		</S.Container>
	);
};

export default MenuPresenter;

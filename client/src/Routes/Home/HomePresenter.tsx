import React from "react";
import DriverHome from "../../Components/DriverHome";
import Maps from "../../Components/Maps";
import PassengerHome from "../../Components/PassengerHome";
import { GetCurrentUser } from "../../types/api";
import { ICoords } from "../../utils/mapHelpers";
import * as S from "./HomeStyle";

interface IProps {
	map?: google.maps.Map<Element>;
	userMarker?: google.maps.Marker;
	userCoords: ICoords;
	userData?: GetCurrentUser;
	setMap: React.Dispatch<
		React.SetStateAction<google.maps.Map<Element> | undefined>
	>;
}

const HomePresenter: React.FC<IProps> = ({
	map,
	userMarker,
	userCoords,
	userData: { GetCurrentUser: { user = {} } = {} } = {},
	setMap
}) => {
	return (
		<S.Contaier>
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

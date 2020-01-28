import React from "react";
import PopUp from "../PopUp";
import SideBarMenu from "../SideBarMenu";

import { IRequest } from "./DriverHomeContainer";

import * as S from "./DriverHomeStyle";

interface IProps {
	ride?: IRequest;
	onCancelHandler: () => void;
	onAcceptHandler: (rideId: number) => void;
}

const DriverHomePresenter: React.FC<IProps> = ({
	ride,
	onCancelHandler,
	onAcceptHandler
}) => {
	return (
		<S.Container>
			<SideBarMenu />
			{ride && ride.price && ride.distance && ride.duration && (
				<PopUp
					isDriver={true}
					pickUpAddress={ride.pickUpAddress}
					dropOffAddress={ride.dropOffAddress}
					price={ride.price}
					distance={ride.distance}
					duration={ride.duration}
					id={ride.id}
					onCancelHandler={onCancelHandler}
					onAcceptHandler={() => onAcceptHandler(ride.id)}
				/>
			)}
		</S.Container>
	);
};

export default DriverHomePresenter;

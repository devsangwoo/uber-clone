import React from "react";
import Routes from "../routes";
import Container from "../../Components/Container";
import Header from "../../Components/Header";
import History from "../../Components/History";
import { GetRideHistory } from "../../types/api";
import { forceHistory } from "../../utils/forceHistory";
import * as S from "./RideHistoryStyle";

interface IProps {
	data?: GetRideHistory;
	isDriver: boolean;
	setIsDriver: any;
	onReachToEnd: any;
}

const RideHistoryPresenter: React.FC<IProps> = ({
	data: { GetRideHistory: { rides = [] } = {} } = {},
	isDriver,
	setIsDriver,
	onReachToEnd
}) => {
	const renderRideHistory = () => {
		if (rides && rides.length > 0) {
			return rides.map(ride => {
				return <History key={ride?.updateAt} rideData={ride} />;
			});
		}
		return `You don't have a ride data as a ${
			isDriver ? "driver" : "passenger"
		}`;
	};

	window.onscroll = () => {
		if (
			window.innerHeight + document.documentElement.scrollTop ===
			document.documentElement.offsetHeight
		) {
			onReachToEnd();
		}
	};

	return (
		<Container>
			<Header
				title="Ride History"
				backFn={() => forceHistory.push(Routes.NUBER)}
			/>
			<S.Container>{renderRideHistory()}</S.Container>
			<S.ToggleSwitch>
				<S.ToggleButton
					type="checkbox"
					checked={isDriver}
					onChange={() => setIsDriver(!isDriver)}
				/>
				<S.Slider isDriver={isDriver}>
					{isDriver ? "Driver" : "Passenger"}
				</S.Slider>
			</S.ToggleSwitch>
		</Container>
	);
};

export default RideHistoryPresenter;

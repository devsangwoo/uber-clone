import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import Routes from "..";
import { GET_CURRENT_USER, UPDATE_RIDE } from "../../SharedQueries";
import {
	GetCurrentUser,
	GetRideByIdRide,
	GetRideByIdRide_GetRideById_ride,
	GetRideByIdRide_GetRideById_ride_driver,
	GetRideByIdRide_GetRideById_ride_passenger,
	GetRideByIdRideVariables,
	UpdateRideStatus,
	UpdateRideStatusVariables
} from "../../types/api";
import { StatusOptions } from "../../types/enums"; // import enum from declaration file cause fater error, kind of bug

import RidePresenter from "./RidePresenter";
import { GET_RIDE_BY_ID_RIDE } from "./RideQueries";

interface IRouteParams {
	rideId: string;
}

interface IProps extends RouteComponentProps<IRouteParams> {}
const RideContainer: React.FC<IProps> = ({ history, location, match }) => {
	const {
		params: { rideId }
	} = match;
	const [profile, setProfile] = useState<
		| GetRideByIdRide_GetRideById_ride_driver
		| GetRideByIdRide_GetRideById_ride_passenger
	>();
	const [ride, setRide] = useState<GetRideByIdRide_GetRideById_ride>();
	const [isDriver, setIsDriver] = useState(false);
	const { data: userData } = useQuery<GetCurrentUser>(GET_CURRENT_USER, {
		fetchPolicy: "network-only"
	});

	const { data: rideData, stopPolling } = useQuery<
		GetRideByIdRide,
		GetRideByIdRideVariables
	>(GET_RIDE_BY_ID_RIDE, {
		fetchPolicy: "cache-and-network",
		onCompleted: ({ GetRideById }) => {
			const { res, ride } = GetRideById;
			if (res && ride && ride.status) {
				if (ride.status === StatusOptions.CANCELED) {
					stopPolling();
					history.push("/");
				}
			}
		},
		pollInterval: 1000,
		variables: {
			rideId: parseInt(rideId, 10)
		}
	});

	const [updateRideMutation] = useMutation<
		UpdateRideStatus,
		UpdateRideStatusVariables
	>(UPDATE_RIDE);

	// setup data for presenter
	useEffect(() => {
		if (userData && rideData) {
			const {
				GetCurrentUser: { user }
			} = userData;
			const {
				GetRideById: { ride }
			} = rideData;
			if (user && ride && ride.driver && ride.passenger) {
				if (user.id === ride.passenger.id) {
					setProfile(ride.driver);
				} else {
					setProfile(ride.passenger);
					setIsDriver(true);
				}
				setRide(ride);
			}
		}
	}, [userData, rideData]);

	const onDriverButton = (status: StatusOptions) => {
		updateRideMutation({
			variables: {
				rideId: parseInt(rideId, 10),
				status
			}
		});
	};

	return (
		<RidePresenter
			profile={profile}
			ride={ride}
			isDriver={isDriver}
			onDriverButton={onDriverButton}
			history={history}
		/>
	);
};

export default RideContainer;

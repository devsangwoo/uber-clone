import { useQuery, useSubscription } from "@apollo/react-hooks";
import React from "react";
import { ICoords } from "../../utils/mapHelpers";
import DriverHomePresenter from "./DriverHomePresenter";
import { GET_NEARBY_RIDES, RIDE_SUBSCRIPTION } from "./DriverHomeQueries";

interface IProps {
	map?: google.maps.Map<Element>;
	userMarker?: google.maps.Marker;
	userCoords: ICoords;
}

const DriverHomeContainer: React.FC<IProps> = ({
	map,
	userMarker,
	userCoords
}) => {
	// only when requested ride is existed, and user is not taken yet
	const { data: requestedData } = useQuery(GET_NEARBY_RIDES, {
		onCompleted: ({ GetNearbyRides }) => {
			console.log(GetNearbyRides);
		}
	});

	const { data } = useSubscription(RIDE_SUBSCRIPTION, {
		onSubscriptionComplete: () => {
			console.log("now it's listening");
		},
		onSubscriptionData: ({ subscriptionData }) => {
			console.log(subscriptionData);
		}
	});

	console.log(data);

	return <DriverHomePresenter />;
};

export default DriverHomeContainer;

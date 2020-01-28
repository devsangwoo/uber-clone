import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import Routes from "..";
import { GET_CURRENT_USER } from "../../SharedQueries";
import {
	GetCurrentUser,
	ReportMovement,
	ReportMovementVariables
} from "../../types/api";
import { generateMarker, ICoords } from "../../utils/mapHelpers";
import HomePresenter from "./HomePresenter";
import { REPORT_MOVEMENT } from "./HomeQueries";

// Warning: Can't perform a React state update on an unmounted component.
// This is a no-op, but it indicates a memory leak in your application.
// To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
//     in HomeContainer (created by Context.Consumer)
interface IProps extends RouteComponentProps {}

const HomeContainer: React.FC<IProps> = ({ history }) => {
	const [map, setMap] = useState<google.maps.Map>();
	const [userMarker, setUserMarker] = useState<google.maps.Marker>();
	const [isSideOpen, setIsSideOpen] = useState(false);
	const [userCoords, setUserCoords] = useState<ICoords>({ lat: 0, lng: 0 });

	const { data: userData } = useQuery<GetCurrentUser>(GET_CURRENT_USER, {
		fetchPolicy: "network-only",
		onCompleted: ({ GetCurrentUser }) => {
			const { res, user } = GetCurrentUser;
			if (res && user && user.currentRideId) {
				history.push(Routes.RIDE + `${user.currentRideId}`);
			}
		}
	});

	const [reportMovementMutation] = useMutation<
		ReportMovement,
		ReportMovementVariables
	>(REPORT_MOVEMENT, {
		onCompleted: ({ ReportMovement: { res, error } }) => {
			if (!res) {
				toast.error(error);
			}
		},
		variables: {
			lastLat: userCoords.lat,
			lastLng: userCoords.lng
		}
	});

	useEffect(() => {
		if (map) {
			const { lat: getLat, lng: getLng } = map.getCenter();
			const marker = generateMarker(
				map,
				{ lat: getLat(), lng: getLng() },
				{
					path: google.maps.SymbolPath.CIRCLE,
					scale: 5
				}
			);
			if (marker) {
				setUserMarker(marker);
			}
		}
	}, [map]);

	useEffect(() => {
		if (userMarker && map) {
			const watchId = navigator.geolocation.watchPosition(
				position => {
					const {
						coords: { latitude: lat, longitude: lng }
					} = position;
					userMarker.setPosition({ lat, lng });
					setUserCoords({ lat, lng });
					reportMovementMutation();
				},
				() => {
					toast.error("Cannot track your location");
				},
				{ enableHighAccuracy: true }
			);
			return () => {
				navigator.geolocation.clearWatch(watchId);
			};
		}
	}, [map, userMarker, setUserCoords, reportMovementMutation]);

	return (
		<HomePresenter
			map={map}
			userMarker={userMarker}
			userCoords={userCoords}
			userData={userData}
			openStatus={isSideOpen}
			toggleSideBar={() => setIsSideOpen(!isSideOpen)}
			setMap={setMap}
		/>
	);
};

export default HomeContainer;

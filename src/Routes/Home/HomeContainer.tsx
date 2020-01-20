import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
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

const HomeContainer: React.FC = () => {
	const [map, setMap] = useState<google.maps.Map>();
	const [userMarker, setUserMarker] = useState<google.maps.Marker>();
	const [isSideOpen, setIsSideOpen] = useState(false);
	const [userCoords, setUserCoords] = useState<ICoords>({ lat: 0, lng: 0 });

	const { data: userData } = useQuery<GetCurrentUser>(GET_CURRENT_USER, {
		fetchPolicy: "network-only"
	});

	const [reportMovementMutation] = useMutation<
		ReportMovement,
		ReportMovementVariables
	>(REPORT_MOVEMENT, {
		variables: {
			lastLat: userCoords.lat,
			lastLng: userCoords.lng
		},
		onCompleted: ({ ReportMovement }) => {
			console.log({
				lastLat: userCoords.lat,
				lastLng: userCoords.lng
			});
			console.log(ReportMovement);
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
			navigator.geolocation.watchPosition(
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
				{ enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
			);
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

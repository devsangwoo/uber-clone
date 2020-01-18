import { useQuery } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GET_CURRENT_USER } from "../../SharedQueries";
import { GetCurrentUser } from "../../types/api";
import { useInput } from "../../utils/hooks";
import { generateMarker, getAddress, getGeoCode } from "../../utils/mapHelpers";
import HomePresenter from "./HomePresenter";

export interface ICoords {
	lat: number;
	lng: number;
}

const HomeContainer: React.FC = () => {
	const { data, loading } = useQuery<GetCurrentUser>(GET_CURRENT_USER, {
		fetchPolicy: "network-only"
	});
	const [isSideOpen, setIsSideOpen] = useState(false);
	const [address, onChangeAddress, setAddressInput] = useInput("");
	const [map, setMap] = useState<google.maps.Map>();
	const [userMarker, setUserMarker] = useState<google.maps.Marker>();
	const [placeMarker, setPlaceMarker] = useState<google.maps.Marker>();
	const [userCoords, setUserCoords] = useState<ICoords>({ lat: 0, lng: 0 });
	const [addMode, setAddMode] = useState(false);

	useEffect(() => {
		if (map) {
			const { lat: getLat, lng: getLng } = map.getCenter();
			generateMarker(map, getLat(), getLng(), setUserMarker, {
				path: google.maps.SymbolPath.CIRCLE,
				scale: 7
			});

			map.addListener("dragend", () =>
				setUserCoords({
					lat: map.getCenter().lat(),
					lng: map.getCenter().lng()
				})
			);
		}
	}, [map]);

	useEffect(() => {
		if (userMarker && map) {
			const { lat: getLat, lng: getLng } = map.getCenter();
			setUserCoords({ lat: getLat(), lng: getLng() });

			navigator.geolocation.watchPosition(
				position => {
					const {
						coords: { latitude, longitude }
					} = position;
					map.setCenter({ lat: latitude, lng: longitude });
					userMarker.setPosition({ lat: latitude, lng: longitude });
				},
				error => {
					toast.error(error);
				},
				{ enableHighAccuracy: true }
			);
		}
	}, [userMarker]);

	const findAddressByInput = async () => {
		if (window.google && google && map) {
			const { lat: getLat, lng: getLng } = map.getCenter();
			const { lat, lng } = await getGeoCode(address, getLat(), getLng());
			if (!lat || !lng) {
				return;
			}
			if (placeMarker) {
				placeMarker.setPosition({ lat, lng });
			} else {
				generateMarker(map, lat, lng, setPlaceMarker);
			}

			if (!userMarker) {
				return;
			}
			const userPosition = userMarker.getPosition();
			if (userPosition) {
				const bounds = new google.maps.LatLngBounds();
				bounds.extend({ lat, lng });
				bounds.extend({
					lat: userPosition.lat(),
					lng: userPosition.lng()
				});
				map.fitBounds(bounds);
			}

			// request ride
		}
	};

	const findAddressByGeoCode = async () => {
		if (window.google && google && map) {
			const { lat, lng } = userCoords;
			const addressResult = await getAddress(lat, lng);
			if (addressResult) {
				setAddressInput(addressResult);
				// request ride
			}
		}
	};

	const onClickHandlerByAddMode = async () => {
		if (addMode) {
			await findAddressByGeoCode();
			setAddMode(false);
		} else {
			setAddMode(true);
		}
	};

	return (
		<HomePresenter
			openStatus={isSideOpen}
			toggleSideBar={() => setIsSideOpen(!isSideOpen)}
			address={address}
			onInputChange={onChangeAddress}
			map={map}
			setMap={setMap}
			onClickHandlerByAddMode={onClickHandlerByAddMode}
			findAddressByInput={findAddressByInput}
			addMode={addMode}
			userCoords={userCoords}
		/>
	);
};

export default HomeContainer;

import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useState, useEffect } from "react";
import {
	GetNearbyDrivers,
	RequestRide,
	RequestRideVariables
} from "../../types/api";
import { useInput } from "../../utils/hooks";
import {
	generateMarker,
	getAddress,
	getGeoCode,
	ICoords
} from "../../utils/mapHelpers";
import PassengerHomePresenter from "./PassengerHomePresenter";
import { GET_NEARBY_DRIVERS, REQUEST_RIDE } from "./PassengerHomeQueries";

interface IProps {
	map?: google.maps.Map<Element>;
	userMarker?: google.maps.Marker;
	userCoords: ICoords;
}

interface IRideVariables {
	distance: string;
	duration: string;
	price: number;
}

const PassengerHomeContainer: React.FC<IProps> = ({
	map,
	userMarker,
	userCoords
}) => {
	const [placeMarker, setPlaceMarker] = useState<google.maps.Marker>();
	const [driverMarkers, setDriverMarkers] = useState<google.maps.Marker[]>(
		[]
	);
	const [reqButtonShow, setReqButtonShow] = useState(false);
	const [address, onChangeAddress, setAddressInput] = useInput("");
	const [rideVariables, setRideVariables] = useState<IRideVariables>({
		distance: "",
		duration: "",
		price: 0
	});
	const [placeCoords, setPlaceCoords] = useState<ICoords>({ lat: 0, lng: 0 });
	const [addMode, setAddMode] = useState(false);

	useQuery<GetNearbyDrivers>(GET_NEARBY_DRIVERS, {
		fetchPolicy: "cache-and-network",
		onCompleted: ({ GetNearbyDrivers: { drivers = [] } }) => {
			if (drivers && drivers.length > 0 && map) {
				for (const driver of drivers) {
					if (driver) {
						const existedDriver = driverMarkers.find(
							driverMarker => driver.id === driverMarker.get("ID")
						);
						const driverLocation: ICoords = {
							lat: driver.lastLat || 0,
							lng: driver.lastLng || 0
						};
						if (existedDriver) {
							existedDriver.setPosition(driverLocation);
							existedDriver.setMap(map);
						} else {
							const marker = generateMarker(map, driverLocation, {
								path:
									google.maps.SymbolPath
										.BACKWARD_CLOSED_ARROW,
								scale: 5
							});
							if (marker) {
								marker.set("ID", driver.id);
								driverMarkers.push(marker);
								setDriverMarkers(driverMarkers);
							}
						}
					}
				}
			}
		},
		pollInterval: 1000
	});

	const [requestRideMutation] = useMutation<
		RequestRide,
		RequestRideVariables
	>(REQUEST_RIDE, {
		onCompleted: ({ RequestRide }) => {},
		variables: {
			...rideVariables,
			dropOffAddress: address,
			dropOffLat: placeCoords.lat,
			dropOffLng: placeCoords.lng,
			pickUpAddress: "home",
			pickUpLat: userCoords.lat,
			pickUpLng: userCoords.lng
		}
	});

	const findAddressByInput = async () => {
		if (window.google && google && map) {
			const geoCode = await getGeoCode(address);
			if (geoCode) {
				renderPlaceMarker(geoCode);
			}
		}
	};

	const findAddressByGeoCode = async () => {
		if (window.google && google && map) {
			const targetGeoCode = {
				lat: map.getCenter().lat(),
				lng: map.getCenter().lng()
			};
			const placeAddress = await getAddress(targetGeoCode);
			if (placeAddress) {
				setAddressInput(placeAddress);
				renderPlaceMarker(targetGeoCode);
			}
		}
	};

	const renderPlaceMarker = (targetGeoCode: ICoords) => {
		if (map && userMarker) {
			if (placeMarker) {
				placeMarker.setPosition({ ...targetGeoCode });
			} else {
				const marker = generateMarker(map, targetGeoCode);
				if (marker) {
					setPlaceMarker(marker);
				}
			}
			setPlaceCoords(targetGeoCode);
			const bounds = new google.maps.LatLngBounds();
			bounds.extend(userCoords);
			bounds.extend(targetGeoCode);
			map.fitBounds(bounds);
			renderPath(targetGeoCode);
		}
	};

	// const renderDriverMaker = (targetGeoCode: ICoords) => {
	// 	if (map) {
	// 		if (placeMarker) {
	// 			placeMarker.setPosition({ ...targetGeoCode });
	// 		} else {
	// 			generateMarker(map, targetGeoCode);
	// 		}
	// 	}
	// };

	const renderPath = (targetGeoCode: ICoords) => {
		const renderOption: google.maps.DirectionsRendererOptions = {
			polylineOptions: {
				strokeColor: "#000" // black
			},
			suppressMarkers: true
		};
		const directionRender = new google.maps.DirectionsRenderer(
			renderOption
		);
		directionRender.setMap(null);
		const directionService = new google.maps.DirectionsService();
		const destination = new google.maps.LatLng(userCoords);
		const origin = new google.maps.LatLng(targetGeoCode);
		const directionServiceOption: google.maps.DirectionsRequest = {
			destination,
			origin,
			travelMode: google.maps.TravelMode.DRIVING
		};
		directionService.route(directionServiceOption, (result, status) => {
			if (status === google.maps.DirectionsStatus.OK) {
				const { routes } = result;
				const {
					distance: { text: distance },
					duration: { text: duration }
				} = routes[0].legs[0];
				const price = parseFloat(distance.split(" ")[0]) * 2;
				setRideVariables({ distance, duration, price });
				directionRender.setDirections(result);
				if (map) {
					directionRender.setMap(map);
					setReqButtonShow(true);
				}
			}
		});
	};

	const onClickHandlerByAddMode = async () => {
		setReqButtonShow(false);
		if (addMode) {
			await findAddressByGeoCode();
			setAddMode(false);
		} else {
			setAddMode(true);
		}
	};

	return (
		<PassengerHomePresenter
			address={address}
			onInputChange={onChangeAddress}
			onClickHandlerByAddMode={onClickHandlerByAddMode}
			findAddressByInput={findAddressByInput}
			addMode={addMode}
			reqButtonShow={reqButtonShow}
			price={rideVariables.price}
			requestRideMutation={requestRideMutation}
		/>
	);
};

export default PassengerHomeContainer;

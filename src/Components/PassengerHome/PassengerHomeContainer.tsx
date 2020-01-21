import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Routes from "../../Routes";
import {
	GetNearbyDrivers,
	GetRideById,
	GetRideByIdVariables,
	RequestRide,
	RequestRideVariables,
	UpdateRideStatus,
	UpdateRideStatusVariables
} from "../../types/api";
import history from "../../utils/history";
import { useInput } from "../../utils/hooks";
import {
	generateMarker,
	getAddress,
	getGeoCode,
	ICoords
} from "../../utils/mapHelpers";
import PassengerHomePresenter from "./PassengerHomePresenter";
import {
	GET_NEARBY_DRIVERS,
	GET_RIDE_BY_ID,
	REQUEST_RIDE,
	UPDATE_RIDE
} from "./PassengerHomeQueries";

interface IProps {
	map?: google.maps.Map<Element>;
	userMarker?: google.maps.Marker;
	userCoords: ICoords;
}

export interface IRideVariables {
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
	const [rideRequested, setrideRequested] = useState(false);
	const [address, onChangeAddress, setAddressInput] = useInput("");
	const [pickUpAddress, _, setPickUpAddress] = useInput("");
	const [rideVariables, setRideVariables] = useState<IRideVariables>({
		distance: "",
		duration: "",
		price: 0
	});
	const [placeCoords, setPlaceCoords] = useState<ICoords>({ lat: 0, lng: 0 });
	const [addMode, setAddMode] = useState(false);
	const [rideId, setRideId] = useState<number>();

	const [fetchRideStatus, { stopPolling }] = useLazyQuery<
		GetRideById,
		GetRideByIdVariables
	>(GET_RIDE_BY_ID, {
		fetchPolicy: "cache-and-network",
		onCompleted: ({ GetRideById }) => {
			console.log(GetRideById);
			const { res, error, ride } = GetRideById;
			if (res && ride) {
				if (ride.status === "ACCEPTED") {
					history.push(Routes.RIDE, {
						rideId
					});
				}
			} else {
				if (error === "not existed ride") {
					stopPolling();
				} else {
					toast.error(error);
				}
			}
		},
		pollInterval: 500,
		variables: {
			rideId: rideId || -1
		}
	});

	useQuery<GetNearbyDrivers>(GET_NEARBY_DRIVERS, {
		fetchPolicy: "cache-and-network",
		onCompleted: ({ GetNearbyDrivers: { drivers = [] } }) => {
			if (drivers && drivers.length > 0 && map) {
				if (driverMarkers.length > drivers.length) {
					while (driverMarkers.length > 0) {
						const marker = driverMarkers.pop();
						if (marker) {
							marker.setMap(null);
						}
					}
					setDriverMarkers(driverMarkers);
				}
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
		onCompleted: ({ RequestRide }) => {
			const { ride } = RequestRide;
			if (ride) {
				setRideId(ride.id);
				fetchRideStatus();
			}
			setReqButtonShow(false);
			setrideRequested(true);
		},
		variables: {
			...rideVariables,
			dropOffAddress: address,
			dropOffLat: placeCoords.lat,
			dropOffLng: placeCoords.lng,
			pickUpAddress,
			pickUpLat: userCoords.lat,
			pickUpLng: userCoords.lng
		}
	});

	const [cancelRideMutation] = useMutation<
		UpdateRideStatus,
		UpdateRideStatusVariables
	>(UPDATE_RIDE, {
		onCompleted: () => {
			setRideId(undefined);
			setReqButtonShow(false);
		}
	});

	const findAddressByInput = async () => {
		if (window.google && google && map) {
			const userAddresss = await getAddress(userCoords);
			if (userAddresss) {
				setPickUpAddress(userAddresss);
			}
			const geoCode = await getGeoCode(address);
			if (geoCode) {
				renderPlaceMarker(geoCode);
			}
		}
	};

	const findAddressByGeoCode = async () => {
		if (window.google && google && map) {
			const userAddresss = await getAddress(userCoords);
			if (userAddresss) {
				setPickUpAddress(userAddresss);
			}
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
			requestRideMutation={requestRideMutation}
			rideRequested={rideRequested}
			rideVariables={rideVariables}
			pickUpAddress={pickUpAddress}
			rideId={rideId}
			stopPolling={stopPolling}
			cancelRideMutation={cancelRideMutation}
		/>
	);
};

export default PassengerHomeContainer;

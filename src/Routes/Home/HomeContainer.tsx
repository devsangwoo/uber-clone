import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GET_CURRENT_USER } from "../../SharedQueries";
import {
	GetCurrentUser,
	GetNearbyDrivers,
	ReportMovement,
	ReportMovementVariables,
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
import HomePresenter from "./HomePresenter";
import {
	GET_NEARBY_DRIVERS,
	REPORT_MOVEMENT,
	REQUEST_RIDE
} from "./HomeQueries";

interface IRideVariables {
	distance: string;
	duration: string;
	price: number;
}

const HomeContainer: React.FC = () => {
	const [map, setMap] = useState<google.maps.Map>();
	const [userMarker, setUserMarker] = useState<google.maps.Marker>();
	const [placeMarker, setPlaceMarker] = useState<google.maps.Marker>();

	const [isSideOpen, setIsSideOpen] = useState(false);
	const [reqButtonShow, setReqButtonShow] = useState(false);
	const [address, onChangeAddress, setAddressInput] = useInput("");
	const [rideVariables, setRideVariables] = useState<IRideVariables>({
		distance: "",
		duration: "",
		price: 0
	});
	const [userCoords, setUserCoords] = useState<ICoords>({ lat: 0, lng: 0 });
	const [placeCoords, setPlaceCoords] = useState<ICoords>({ lat: 0, lng: 0 });
	const [addMode, setAddMode] = useState(false);

	const { data: userData } = useQuery<GetCurrentUser>(GET_CURRENT_USER, {
		fetchPolicy: "network-only"
	});

	const { data: driversData } = useQuery<GetNearbyDrivers>(
		GET_NEARBY_DRIVERS,
		{
			fetchPolicy: "network-only",
			onCompleted: ({ GetNearbyDrivers }) => {
				console.log(`fetched nearby drivers`);
				console.log(GetNearbyDrivers.drivers);
			}
		}
	);

	const [reportMovementMutation] = useMutation<
		ReportMovement,
		ReportMovementVariables
	>(REPORT_MOVEMENT, {
		variables: {
			lastLat: userCoords.lat,
			lastLng: userCoords.lng
		}
	});

	const [requestRideMutation] = useMutation<
		RequestRide,
		RequestRideVariables
	>(REQUEST_RIDE, {
		onCompleted: ({ RequestRide }) => {
			console.log(RequestRide);
		},
		variables: {
			...rideVariables,
			dropOffAddress: address,
			dropOffLat: placeCoords.lat,
			dropOffLng: placeCoords.lng,
			pickUpAddress: "address",
			pickUpLat: userCoords.lat,
			pickUpLng: userCoords.lng
		}
	});

	useEffect(() => {
		if (map) {
			const { lat: getLat, lng: getLng } = map.getCenter();
			generateMarker(
				map,
				{ lat: getLat(), lng: getLng() },
				setUserMarker,
				{
					path: google.maps.SymbolPath.CIRCLE,
					scale: 5
				}
			);
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
	}, [userMarker]);

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
				generateMarker(map, targetGeoCode, setPlaceMarker);
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
		<HomePresenter
			userData={userData}
			openStatus={isSideOpen}
			toggleSideBar={() => setIsSideOpen(!isSideOpen)}
			setMap={setMap}
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

export default HomeContainer;

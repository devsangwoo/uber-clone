import { GoogleApiWrapper, GoogleAPI, Map } from "google-maps-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import FindAddressPresenter from "./FindAddressPresenter";
import { useInput } from "../../utils/hooks";
import ReactDOM from "react-dom";

interface ICoords {
	lat: number;
	lng: number;
}
// interface IProps {
// 	google: GoogleAPI;
// }

const FindAddressContainer: React.FC = () => {
	// const [coords, setCoords] = useState({ lat: 0, lng: 0 });
	const [lat, setLat] = useState(0);
	const [lng, setLng] = useState(0);
	// const [map, setMap] = useState(google.maps.Map);
	const mapRef = useRef();
	let map;
	let service;
	const [placeInput, onPlaceInputChange] = useInput("");

	const handleGeoSucces: PositionCallback = (positon: Position) => {
		const {
			coords: { latitude, longitude }
		} = positon;
		// setCoords({ lat: latitude, lng: longitude });
		setLat(latitude);
		setLng(longitude);
		console.log(lat, lng);
		loadMap(latitude, longitude);
		// this.reverseGeocodeAddress(latitude, longitude);
	};

	const handleGeoError: PositionErrorCallback = () => {
		console.log("No location");
	};

	// tslint:disable-next-line: no-shadowed-variable
	const loadMap = (lat: number, lng: number) => {
		const maps = google.maps;
		if (mapRef && mapRef.current !== undefined) {
			const mapNode = ReactDOM.findDOMNode(mapRef.current);
			if (mapNode) {
				const castedMapNode = mapNode as Element;

				const mapConfig: google.maps.MapOptions = {
					center: { lat, lng },
					disableDefaultUI: true,
					minZoom: 8,
					zoom: 11
				};
				service = new maps.places.PlacesService(
					castedMapNode as HTMLDivElement
				);
				map = new maps.Map(castedMapNode as Element, mapConfig);
				console.log(map);
				// console.log(service);
				// map.addListener("dragend", .handleDragEnd);
			}
		}
	};
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			handleGeoSucces,
			handleGeoError
		);
		console.log("hello");
	}, [lat, lng]);
	const mapProps = {
		// center: { ...coords },
		google,
		zoom: 15
	};
	// const map = new google.maps.Map(mapRef.current, mapProps);
	const submitFn = () => {};
	return (
		<FindAddressPresenter
			mapRef={mapRef}
			mapProps={{}}
			submitFn={submitFn}
			placeInput={placeInput}
			onPlaceInputChange={onPlaceInputChange}
		/>
	);
};

export default FindAddressContainer;
// export default GoogleApiWrapper({
// 	apiKey: "AIzaSyBX_l2TLTE9DnwuvS4cU-9QYo-TTlZVlVk",
// 	libraries: ["places"]
// })(FindAddressContainer);

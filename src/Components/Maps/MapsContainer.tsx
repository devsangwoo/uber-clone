import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import { loadGoogleMapApi } from "../../utils/mapHelpers";
import MapsPresenter from "./MapsPresenter";

interface ICoords {
	lat: number;
	lng: number;
}

const MapsContainer: React.FC = () => {
	const mapRef = useRef();
	const [coords, setCoords] = useState<ICoords>({ lat: 0, lng: 0 });
	const [map, setMap] = useState<google.maps.Map>();

	useEffect(() => {
		if (!window.google) {
			loadGoogleMapApi(getCurrentLocation);
		} else {
			getCurrentLocation();
		}
	}, []);

	useEffect(() => {
		if (map) {
			map.addListener("dragend", () =>
				setCoords({
					lat: map.getCenter().lat(),
					lng: map.getCenter().lng()
				})
			);
			map.addListener("rightclick", () => console.log("rightClicked!"));
		}
	}, [map]); // when map is initialized as undefined, and after then componenet did mount update map as instance of Map

	const getCurrentLocation = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
				const {
					coords: { latitude, longitude }
				} = position;
				loadMap(latitude, longitude);
			},
			() => toast.error("Cannot find your location"),
			{ enableHighAccuracy: true }
		);
	};

	const loadMap = (lat: number, lng: number) => {
		const mapNode = ReactDOM.findDOMNode(mapRef.current);
		const mapConfig: google.maps.MapOptions = {
			center: { lat, lng },
			disableDefaultUI: true,
			minZoom: 8,
			zoom: 15
		};
		setMap(new google.maps.Map(mapNode as Element, mapConfig));
	};

	return <MapsPresenter mapRef={mapRef} />;
};

export default MapsContainer;

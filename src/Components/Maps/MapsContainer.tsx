import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import { ICoords } from "../../Routes/Home/HomeContainer";
import { loadGoogleMapApi } from "../../utils/mapHelpers";
import MapsPresenter from "./MapsPresenter";

interface IProps {
	map: google.maps.Map<Element> | undefined;
	setMap: React.Dispatch<
		React.SetStateAction<google.maps.Map<Element> | undefined>
	>;
	userCoords: ICoords;
}

const MapsContainer: React.FC<IProps> = ({ map, setMap, userCoords }) => {
	const mapRef = useRef();

	useEffect(() => {
		if (!window.google) {
			loadGoogleMapApi(getCurrentLocation);
		} else {
			getCurrentLocation();
		}
	}, []);

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

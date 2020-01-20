import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import { ICoords } from "../../utils/mapHelpers";
import { loadGoogleMapApi } from "../../utils/mapHelpers";
import MapsPresenter from "./MapsPresenter";

interface IProps {
	setMap: React.Dispatch<
		React.SetStateAction<google.maps.Map<Element> | undefined>
	>;
}

const MapsContainer: React.FC<IProps> = ({ setMap }) => {
	const mapRef = useRef();

	useEffect(() => {
		const loadMap = (coords: ICoords) => {
			const mapNode = ReactDOM.findDOMNode(mapRef.current);
			const mapConfig: google.maps.MapOptions = {
				center: { ...coords },
				disableDefaultUI: true,
				zoom: 15
			};
			setMap(new google.maps.Map(mapNode as Element, mapConfig));
		};
		const getCurrentLocation = () => {
			navigator.geolocation.getCurrentPosition(
				position => {
					const {
						coords: { latitude, longitude }
					} = position;
					loadMap({ lat: latitude, lng: longitude });
				},
				() => toast.error("Cannot find your location"),
				{ enableHighAccuracy: true, timeout: 10000 }
			);
		};
		if (!window.google) {
			loadGoogleMapApi(getCurrentLocation);
		} else {
			getCurrentLocation();
		}
	}, [setMap]);

	return <MapsPresenter mapRef={mapRef} />;
};

export default MapsContainer;

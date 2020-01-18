import axios from "axios";
import { toast } from "react-toastify";
import { GOOGLE_MAP_API_KEY } from "../keys";

export const loadGoogleMapApi = (onLoadSuccess: () => any) => {
	const script = document.createElement(`script`);
	script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
	document.head.append(script);
	script.addEventListener("load", onLoadSuccess);
};

export const getAddress = async (lat: number, lng: number) => {
	const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAP_API_KEY}`;
	const { status, data } = await axios.get(url);
	if (status) {
		const { results } = data;
		const place = results[0];
		const address = place.formatted_address;
		return address;
	} else {
		toast.error(data.error_message);
	}
};

export const getGeoCode = async (address: string, lat: number, lng: number) => {
	const encodedAddress = address.replace(" ", "+");
	const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAP_API_KEY}&${lat},${lng}&radius=5000`;
	const { status, data } = await axios.get(url);
	if (status) {
		const { results } = data;
		const place = results[0];
		const { location } = place.geometry;

		return location;
	} else {
		toast.error(data.error_message);
	}
};

import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { GOOGLE_MAP_API_KEY } from "../../keys";
import { useInput } from "../../utils/hooks";
import {
	getAddress,
	getGeoCode,
	loadGoogleMapApi
} from "../../utils/mapHelpers";
import FindAddressPresenter from "./FindAddressPresenter";

interface ICoords {
	lat: number;
	lng: number;
}

interface IProps extends RouteComponentProps<any> {
	google: any;
}
const FindAddressContainer: React.FC = () => {
	const mapRef = useRef();
	const [address, onChangeAddress, setAddress] = useInput("");
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
			() => toast.error("Cannot find your location")
		);
	};

	const loadMap = (lat: number, lng: number) => {
		const mapNode = ReactDOM.findDOMNode(mapRef.current);
		const mapConfig: google.maps.MapOptions = {
			center: { lat, lng },
			disableDefaultUI: true,
			minZoom: 8,
			zoom: 13
		};
		setMap(new google.maps.Map(mapNode as Element, mapConfig));
	};

	const onPickHandler = async () => {
		const { lat, lng } = coords;
		const addressResult = await getAddress(lat, lng);
		if (addressResult) {
			setAddress(addressResult);
		}
	};

	const submitFn = async () => {
		const { lat, lng } = await getGeoCode(address, coords.lat, coords.lng);
		if (lat && lng && map) {
			map.panTo({ lat, lng });
		}
	};

	return (
		<FindAddressPresenter
			mapRef={mapRef}
			address={address}
			onInputChange={onChangeAddress}
			submitFn={submitFn}
			onPickPlace={onPickHandler}
		/>
	);
};

// class FindAddressContainer extends React.Component<IProps, IState> {
// 	public mapRef: any;
// 	public map: any;
// 	public state = {
// 		address: "",
// 		lat: 0,
// 		lng: 0
// 	};
// 	constructor(props: IProps) {
// 		super(props);
// 		this.mapRef = React.createRef();
// 	}
// 	public componentDidMount() {
// 		navigator.geolocation.getCurrentPosition(
// 			this.handleGeoSucces,
// 			this.handleGeoError
// 		);
// 	}
// 	public render() {
// 		const { address } = this.state;
// 		return (
// 			<FindAddressPresenter
// 				mapRef={this.mapRef}
// 				address={address}
// 				onInputChange={this.onInputChange}
// 				onInputBlur={() => {}}
// 				onPickPlace={() => {}}
// 			/>
// 		);
// 	}
// 	public handleGeoSucces: PositionCallback = (positon: Position) => {
// 		const {
// 			coords: { latitude, longitude }
// 		} = positon;
// 		this.setState({
// 			lat: latitude,
// 			lng: longitude
// 		});
// 		this.loadMap(latitude, longitude);
// 		// this.reverseGeocodeAddress(latitude, longitude);
// 	};
// 	public handleGeoError: PositionErrorCallback = () => {
// 		console.log("No location");
// 	};
// 	public loadMap = (lat: number, lng: number) => {
// 		const { google } = this.props;
// 		const maps = google.maps;
// 		const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
// 		const mapConfig: google.maps.MapOptions = {
// 			center: {
// 				lat,
// 				lng
// 			},
// 			disableDefaultUI: true,
// 			minZoom: 8,
// 			zoom: 11
// 		};
// 		this.map = new maps.Map(mapNode, mapConfig);
// 		this.map.addListener("dragend", this.handleDragEnd);
// 	};
// 	public handleDragEnd = () => {
// 		const newCenter = this.map.getCenter();
// 		const lat = newCenter.lat();
// 		const lng = newCenter.lng();
// 		this.setState({
// 			lat,
// 			lng
// 		});
// 		// this.reverseGeocodeAddress(lat, lng);
// 	};
// 	public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// 		const {
// 			target: { name, value }
// 		} = event;
// 		this.setState({
// 			[name]: value
// 		} as any);
// 	};
// 	// public onInputBlur = async () => {
// 	//   const { address } = this.state;
// 	//   const result = await geoCode(address);
// 	//   if (result !== false) {
// 	//     const { lat, lng, formatted_address: formatedAddress } = result;
// 	//     this.setState({
// 	//       address: formatedAddress,
// 	//       lat,
// 	//       lng
// 	//     });
// 	//     this.map.panTo({ lat, lng });
// 	//   }
// 	// };
// 	// public reverseGeocodeAddress = async (lat: number, lng: number) => {
// 	//   const reversedAddress = await reverseGeoCode(lat, lng);
// 	//   if (reversedAddress !== false) {
// 	//     this.setState({
// 	//       address: reversedAddress
// 	//     });
// 	//   }
// 	// };
// 	// public onPickPlace = () => {
// 	//   const { address, lat, lng } = this.state;
// 	//   const { history } = this.props;
// 	//   history.push({
// 	//     pathname: "/add-place",
// 	//     state: {
// 	//       address,
// 	//       lat,
// 	//       lng
// 	//     }
// 	//   });
// 	// };
// }

export default FindAddressContainer;

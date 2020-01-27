import React, { useState } from "react";
import { generateMarker, renderPath } from "../../utils/mapHelpers";
import Maps from "../Maps";
import * as S from "./HistoryStyle";

interface IProps {
	rideData: any;
}

const HistoryPresenter: React.FC<IProps> = ({
	rideData: {
		pickUpAddress,
		dropOffAddress,
		status,
		price,
		updateAt,
		pickUpLat,
		pickUpLng,
		dropOffLat,
		dropOffLng
	}
}) => {
	const [map, setMap] = useState<google.maps.Map>();

	if (map) {
		const pickUpGeoCode = { lat: pickUpLat, lng: pickUpLng };
		const dropOffGeoCode = { lat: dropOffLat, lng: dropOffLng };
		generateMarker(map, pickUpGeoCode);
		generateMarker(map, dropOffGeoCode);
		renderPath(map, pickUpGeoCode, dropOffGeoCode);
	}

	return (
		<S.Container>
			<S.Status>{status}</S.Status>
			<S.MapContainer>
				<Maps setMap={setMap} isHome={false} />
			</S.MapContainer>
			<S.Date>{new Date(parseInt(updateAt, 10)).toDateString()}</S.Date>
			<S.InfoContainer>
				<S.Title>From</S.Title>
				<S.Data>{pickUpAddress}</S.Data>
				<S.Title>To</S.Title>
				<S.Data>{dropOffAddress}</S.Data>
			</S.InfoContainer>
		</S.Container>
	);
};

export default HistoryPresenter;

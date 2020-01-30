import React from "react";
import * as S from "./HistoryStyle";

interface IProps {
	rideData: any;
}

const HistoryPresenter: React.FC<IProps> = ({
	rideData: { pickUpAddress, dropOffAddress, status, updateAt, rideImage }
}) => {
	return (
		<S.Container>
			<S.Status>{status}</S.Status>
			<S.MapContainer>
				<S.Image src={rideImage} />
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

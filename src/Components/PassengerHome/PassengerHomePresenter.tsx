import React from "react";
import { ReactComponent as AddIcon } from "../../assets/icons/add.svg";
import { ReactComponent as AddEmptyIcon } from "../../assets/icons/addEmpty.svg";
import AddressBar from "../../Components/AddressBar";
import Form from "../../Components/Form";
import IconButton from "../../Components/IconButton";
import PopUp from "../../Components/PopUp";
import { StatusOptions } from "../../types/enums"; // import enum from declaration file cause fater error, kind of bug
import { IRideVariables } from "./PassengerHomeContainer";
import * as S from "./PassengerHomeStyle";

interface IProps {
	address: string;
	onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	findAddressByInput: any;
	onClickHandlerByAddMode: any;
	addMode: boolean;
	reqButtonShow: boolean;
	rideRequested: boolean;
	requestRideMutation: any;
	rideVariables: IRideVariables;
	pickUpAddress: string;
	rideId?: number;
	cancelRideMutation: any;
	stopPolling: any;
}

const PassengerHomePresenter: React.FC<IProps> = ({
	address,
	onInputChange,
	findAddressByInput,
	addMode,
	onClickHandlerByAddMode,
	reqButtonShow,
	rideRequested,
	requestRideMutation,
	rideVariables: { price, duration, distance },
	pickUpAddress,
	rideId,
	cancelRideMutation,
	stopPolling
}) => {
	const addIconStyle = { top: "15px", right: "1vw" };
	return (
		<React.Fragment>
			<IconButton onClick={onClickHandlerByAddMode} style={addIconStyle}>
				{addMode ? <AddIcon /> : <AddEmptyIcon />}
			</IconButton>
			<Form submitFn={findAddressByInput}>
				<AddressBar value={address} onChange={onInputChange} />
			</Form>
			{addMode && <S.Center>📍</S.Center>}
			{reqButtonShow && (
				<S.RequestButton
					onClick={requestRideMutation}
					value={`Request a Ride($${price})`}
				/>
			)}
			{rideRequested && rideId && (
				<PopUp
					price={price}
					duration={duration}
					distance={distance}
					dropOffAddress={address}
					pickUpAddress={pickUpAddress}
					onCancelHandler={() => {
						stopPolling();
						cancelRideMutation({
							variables: {
								rideId,
								status: StatusOptions.CANCELED
							}
						});
					}}
					isDriver={false}
					id={rideId}
				/>
			)}
		</React.Fragment>
	);
};

export default PassengerHomePresenter;

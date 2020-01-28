import html2canvas from "html2canvas";
import React from "react";
import { ReactComponent as AddIcon } from "../../assets/icons/add.svg";
import { ReactComponent as AddEmptyIcon } from "../../assets/icons/addEmpty.svg";
import { StatusOptions } from "../../types/enums"; // import enum from declaration file cause fater error, kind of bug
import { base64Uploader } from "../../utils/fileUploader";
import AddressBar from "../AddressBar";
import Form from "../Form";
import IconButton from "../IconButton";
import PopUp from "../PopUp";
import SideBarMenu from "../SideBarMenu";
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
	setRideVariables: any;
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
	stopPolling,
	setRideVariables
}) => {
	const onRequestRide = async () => {
		const map = document.getElementById("googleMap");
		if (map) {
			const canvas = await html2canvas(map, {
				allowTaint: false,
				ignoreElements: node => {
					return node.nodeName === "IFRAME";
				},
				useCORS: true
			});
			const url = canvas.toDataURL("image/png");
			const res = await base64Uploader(url);
			if (res) {
				setRideVariables({ rideImage: res, price, duration, distance });
			}
		}
		requestRideMutation();
	};

	const addIconStyle = { top: "15px", right: "1vw" };
	return (
		<React.Fragment>
			<SideBarMenu />
			<IconButton onClick={onClickHandlerByAddMode} style={addIconStyle}>
				{addMode ? <AddIcon /> : <AddEmptyIcon />}
			</IconButton>
			<Form submitFn={findAddressByInput}>
				<AddressBar value={address} onChange={onInputChange} />
			</Form>
			{addMode && (
				<S.Center>
					<span role="img" aria-label="pin">
						📍
					</span>
				</S.Center>
			)}
			{reqButtonShow && (
				<S.RequestButton
					onClick={onRequestRide}
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

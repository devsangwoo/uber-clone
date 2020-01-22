import React from "react";
import Routes from "..";
import { ReactComponent as ChatIcon } from "../../assets/icons/chat.svg";
import Button from "../../Components/Button";
import Header from "../../Components/Header";
import {
	GetRideByIdRide_GetRideById_ride,
	GetRideByIdRide_GetRideById_ride_driver,
	GetRideByIdRide_GetRideById_ride_passenger
} from "../../types/api";

import { StatusOptions } from "../../types/enums";

import * as S from "./RideStyle";

interface IProps {
	profile?:
		| GetRideByIdRide_GetRideById_ride_driver
		| GetRideByIdRide_GetRideById_ride_passenger;
	ride?: GetRideByIdRide_GetRideById_ride;
	isDriver: boolean;
	onDriverButton: (status: StatusOptions) => void;
	history: any;
}

const RidePresenter: React.FC<IProps> = ({
	profile,
	ride,
	isDriver,
	onDriverButton,
	history
}) => {
	const buttonArgs = () => {
		if (isDriver && ride) {
			if (ride.status === StatusOptions.ACCEPTED) {
				return {
					onClick: () => onDriverButton(StatusOptions.ONROUTE),
					value: "PICKED UP"
				};
			} else {
				return {
					onClick: () => onDriverButton(StatusOptions.FINISHED),
					value: "FINISHED"
				};
			}
		} else {
			return {
				value: "ENJOY YOUR RIDE WITH NUBER"
			};
		}
	};

	return (
		<S.Container>
			<Header title={"Ride"} backTo={Routes.HOME} />
			<S.RideContainer>
				<S.Img
					src={
						profile?.profilePhoto ||
						"http://simpleicon.com/wp-content/uploads/user1.svg"
					}
				/>
				<S.User>
					<S.UserName>{profile?.fullName}</S.UserName>
					<S.UserPhone>{profile?.phoneNumber}</S.UserPhone>
				</S.User>
				{ride && (
					<S.IconButton
						onClick={() =>
							history.push(`${Routes.CHAT}${ride.chatId}`)
						}
					>
						<ChatIcon style={{ width: "45px", height: "45px" }} />
					</S.IconButton>
				)}
			</S.RideContainer>
			{ride && (
				<S.RideContainer>
					<S.Info>
						<S.Title>From</S.Title>
						<S.Data>{ride.pickUpAddress}</S.Data>
						<S.Title>To</S.Title>
						<S.Data>{ride.dropOffAddress}</S.Data>
						<S.Title>Distance</S.Title>
						<S.Data>{ride.distance}</S.Data>
						<S.Title>Duration</S.Title>
						<S.Data>{ride.duration}</S.Data>
						<S.Title>Price</S.Title>
						<S.Data>${ride.price}</S.Data>
						<S.Title>Status</S.Title>
						<S.Data>{ride.status}</S.Data>
					</S.Info>
					<S.Buttons>
						<Button {...buttonArgs()} />
						{ride.status !== StatusOptions.ONROUTE && (
							<S.ButtonOnCancel
								onClick={() =>
									onDriverButton(StatusOptions.CANCELED)
								}
								value="Cancel"
							/>
						)}
					</S.Buttons>
				</S.RideContainer>
			)}
		</S.Container>
	);
};

export default RidePresenter;

import React, { useEffect, useState } from "react";
import Button from "../Button";

import * as S from "./PopUpStyle";

interface IProps {
	isDriver: boolean;
	pickUpAddress: string;
	dropOffAddress: string;
	price: number;
	distance: string;
	duration: string;
	onCancelHandler: () => void;
	onAcceptHandler?: () => void;
	id: number;
}

const PopUpPresenter: React.FC<IProps> = ({
	isDriver,
	pickUpAddress,
	dropOffAddress,
	price,
	duration,
	distance,
	onCancelHandler,
	onAcceptHandler,
	id
}) => {
	// To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
	const [dots, setDots] = useState(".");
	useEffect(() => {
		let timer: number;
		if (!isDriver) {
			timer = setTimeout(() => {
				if (dots.length === 3) {
					setDots(".");
				} else {
					setDots(dots + ".");
				}
			}, 500);
		}
		return () => {
			clearTimeout(timer);
		};
	}, [isDriver, dots]);
	return (
		<S.PopUpContainer>
			<S.Header>RIDE</S.Header>
			<S.Title>From</S.Title>
			<S.Data>{pickUpAddress}</S.Data>
			<S.Title>To</S.Title>
			<S.Data>{dropOffAddress}</S.Data>
			<S.Title>Price</S.Title>
			<S.Data>{price}</S.Data>
			<S.Title>Distance</S.Title>
			<S.Data>{distance}</S.Data>
			<S.Title>Duration</S.Title>
			<S.Data>{duration}</S.Data>
			<S.ButtonContainer>
				{isDriver ? (
					<S.ButtonOnAccept
						onClick={onAcceptHandler}
						value={"Accept"}
					/>
				) : (
					<Button value={`Finding a driver${dots}`} />
				)}
				<S.ButtonOnCancel
					onClick={onCancelHandler}
					value={isDriver ? "Dismiss" : "Cancel"}
				/>
			</S.ButtonContainer>
		</S.PopUpContainer>
	);
};

export default PopUpPresenter;

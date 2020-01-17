import React from "react";
import AddressBar from "../../Components/AddressBar";
import * as S from "./FindAddressStyle";

interface IProps {
	mapRef: any;
	address: string;
	onInputBlur: () => void;
	onPickPlace: () => void;
	onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FindAddressPresenter: React.FC<IProps> = ({
	mapRef,
	address,
	onInputChange,
	onInputBlur,
	onPickPlace
}) => {
	return (
		<div>
			<AddressBar
				onBlur={onInputBlur}
				onChange={onInputChange}
				name={"address"}
				value={address}
			/>
			<S.ExtendedButton value={"Pick this place"} onClick={onPickPlace} />
			<S.Center>📍</S.Center>
			<S.Map ref={mapRef} />
		</div>
	);
};

export default FindAddressPresenter;

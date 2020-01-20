import React from "react";
import AddressBar from "../../Components/AddressBar";
import Form from "../../Components/Form";
import * as S from "./FindAddressStyle";

interface IProps {
	mapRef: any;
	address: string;
	onPickPlace: () => void;
	submitFn: () => void;
	onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FindAddressPresenter: React.FC<IProps> = ({
	mapRef,
	address,
	onInputChange,
	onPickPlace,
	submitFn
}) => {
	return (
		<div>
			<Form submitFn={submitFn}>
				<AddressBar
					onBlur={submitFn}
					onChange={onInputChange}
					name={"address"}
					value={address}
				/>
			</Form>
			<S.ExtendedButton value={"Pick this place"} onClick={onPickPlace} />
			{/* <S.Center>📍</S.Center> */}
			<S.Map ref={mapRef} />
		</div>
	);
};

export default FindAddressPresenter;

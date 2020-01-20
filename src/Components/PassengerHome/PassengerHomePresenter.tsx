import React from "react";
import { ReactComponent as AddIcon } from "../../assets/icons/add.svg";
import { ReactComponent as AddEmptyIcon } from "../../assets/icons/addEmpty.svg";
import AddressBar from "../../Components/AddressBar";
import Form from "../../Components/Form";
import IconButton from "../../Components/IconButton";
import * as S from "./PassengerHomeStyle";

interface IProps {
	address: string;
	onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	findAddressByInput: any;
	onClickHandlerByAddMode: any;
	addMode: boolean;
	reqButtonShow: boolean;
	price: number;
	requestRideMutation: any;
}

const PassengerHomePresenter: React.FC<IProps> = ({
	address,
	onInputChange,
	findAddressByInput,
	addMode,
	onClickHandlerByAddMode,
	reqButtonShow,
	price,
	requestRideMutation
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
		</React.Fragment>
	);
};

export default PassengerHomePresenter;

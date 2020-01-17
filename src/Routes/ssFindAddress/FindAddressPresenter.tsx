import { GoogleApiWrapper, Marker, MapProps, Map } from "google-maps-react";
import React, { Ref } from "react";
import Container from "../../Components/Container";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import * as S from "./FindAddressStyle";

interface IProps {
	mapProps: any;
	mapRef: any;
	submitFn: any;
	placeInput: string;
	onPlaceInputChange: (event: React.ChangeEvent<Element>) => any;
}

const renderMarker = () => <div>a</div>;
const FindAddressPresenter: React.FC<IProps> = ({
	mapRef,
	mapProps,
	submitFn,
	placeInput,
	onPlaceInputChange
}) => {
	return (
		<Container>
			{/* <Header title={"NUBER"} /> */}
			<Form submitFn={submitFn}>
				<Input value={placeInput} onChange={onPlaceInputChange} />
			</Form>
			<Container>
				{/* <S.MapExtend id={"map"} ref={mapRef} {...mapProps}>
					{renderMarker()}
				</S.MapExtend> */}
				<S.MapDiv ref={mapRef} {...mapProps}>
					{renderMarker()}
				</S.MapDiv>
			</Container>
		</Container>
	);
};
export default FindAddressPresenter;

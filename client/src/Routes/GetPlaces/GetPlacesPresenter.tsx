import React from "react";
import Header from "../../Components/Header";
import Place from "../../Components/Place";
import { GetPlaces_GetMyPlaces_places } from "../../types/api";
import * as S from "./GetPlacesStyle";

interface IProps {
	loading: boolean;
	data?: any;
}

const placeRender = (places: GetPlaces_GetMyPlaces_places[]) => {
	return places.map(place => place && <Place key={place.id} {...place} />);
};

const PlacesPresenter: React.FC<IProps> = ({
	data: { GetMyPlaces: { places = null } = {} } = {},
	loading
}) => {
	return (
		<S.Container>
			<Header title={"Places"} backTo={"/"} />
			<S.Places>
				{!loading && places && placeRender(places)}
				<S.LinkExtend to={"/add-place"}>Add some places!</S.LinkExtend>
			</S.Places>
		</S.Container>
	);
};

export default PlacesPresenter;

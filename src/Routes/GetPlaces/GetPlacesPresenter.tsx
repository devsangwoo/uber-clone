import React from "react";
import Header from "../../Components/Header";
import Place from "../../Components/Place";
import { GetPlaces_GetMyPlaces_places } from "../../types/api";
import * as S from "./GetPlacesStyle";

interface IProps {
	loading: boolean;
	data?: any;
}

const placeRender = (places: Array<GetPlaces_GetMyPlaces_places | null>) => {
	if (places) {
		return places.map(place => {
			if (place) {
				return <Place key={place.id} {...place} />;
			}
		});
	}
	return <div>You have no place</div>;
};

const PlacesPresenter: React.FC<IProps> = ({
	data: { GetMyPlaces: { places = null } = {} } = {},
	loading
}) => {
	return (
		<React.Fragment>
			<Header title={"Places"} backTo={"/"} />
			<S.Container>
				{!loading && placeRender(places)}
				<S.LinkExtend to={"/add-place"}>Add some places!</S.LinkExtend>
			</S.Container>
		</React.Fragment>
	);
};

export default PlacesPresenter;

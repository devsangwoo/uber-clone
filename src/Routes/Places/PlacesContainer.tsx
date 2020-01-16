import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { GetPlaces } from "../../types/api";
import PlacesPresenter from "./PlacesPresenter";
import { GET_PLACES } from "./PlacesQueries";

const PlacesContainer: React.FC = () => {
	const { data: placeData, loading } = useQuery<GetPlaces>(GET_PLACES);

	return <PlacesPresenter loading={loading} data={placeData} />;
};

export default PlacesContainer;

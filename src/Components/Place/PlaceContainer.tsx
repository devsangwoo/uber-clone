import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { GET_PLACES } from "../../Routes/GetPlaces/GetPlacesQueries";
import PlacePresenter from "./PlacePresenter";
import { EDIT_PLACE } from "./PlaceQueries";

interface IProps {
	isFav: boolean;
	name: string;
	address: string;
	id: number;
}

const PlaceContainer: React.FC<IProps> = ({ id, isFav, name, address }) => {
	const [updatePlaceMutation] = useMutation(EDIT_PLACE, {
		refetchQueries: () => [{ query: GET_PLACES }],
		variables: { id, isFav: !isFav }
	});

	return (
		<PlacePresenter
			onStarPress={updatePlaceMutation}
			fav={isFav}
			name={name}
			address={address}
		/>
	);
};

export default PlaceContainer;

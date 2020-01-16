import React from "react";
import * as S from "./PlaceStyle";

interface IProps {
	fav: boolean;
	name: string;
	address: string;
	onStarPress: any;
}

const PlacePresenter: React.FC<IProps> = ({
	onStarPress,
	fav,
	name,
	address
}) => (
	<S.Place>
		<S.Icon onClick={onStarPress}>{fav ? "★" : "✩"}</S.Icon>
		<S.Container>
			<S.Name>{name}</S.Name>
			<S.Address>{address}</S.Address>
		</S.Container>
	</S.Place>
);

export default PlacePresenter;

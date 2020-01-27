import React from "react";
import * as S from "./MapsStyle";

interface IProps {
	mapRef: any;
	isHome: boolean;
}

const MapsPresenter: React.FC<IProps> = ({ mapRef, isHome }) => {
	return <S.Map ref={mapRef} isHome={isHome} />;
};

export default MapsPresenter;

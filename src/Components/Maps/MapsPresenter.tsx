import React from "react";
import * as S from "./MapsStyle";

interface IProps {
	mapRef: any;
}

const MapsPresenter: React.FC<IProps> = ({ mapRef }) => {
	return <S.Map ref={mapRef} />;
};

export default MapsPresenter;

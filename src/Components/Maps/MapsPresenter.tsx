import React from "react";
import * as S from "./MapsStyle";

interface IProps {
	mapRef: any;
}

const MapsPresenter: React.FC<IProps> = ({ mapRef }) => {
	return (
		<div>
			<S.Map ref={mapRef} />
		</div>
	);
};

export default MapsPresenter;

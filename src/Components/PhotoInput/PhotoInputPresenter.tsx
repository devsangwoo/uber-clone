import React from "react";
import * as S from "./PhotoInputStyle";

interface IProps {
	uploading: boolean;
	fileUrl: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhotoInputPresenter: React.FC<IProps> = ({
	uploading,
	fileUrl,
	onChange
}) => (
	<S.Container>
		<S.Input
			id={"photo"}
			type="file"
			accept="image/*"
			onChange={onChange}
		/>
		<S.Image htmlFor="photo">
			{uploading && "..."}
			{!uploading && <img src={fileUrl} />}
		</S.Image>
	</S.Container>
);

export default PhotoInputPresenter;

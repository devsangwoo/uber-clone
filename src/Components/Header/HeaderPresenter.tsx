import React from "react";
import * as S from "./HeaderStyle";
import BackArrow from "../BackArrow";

interface IProps {
	title: string;
	backTo?: string;
}

const HeaderPresenter: React.FC<IProps> = ({ title, backTo }) => {
	return (
		<S.Container>
			{backTo && <BackArrow backTo={backTo} />}
			<S.Title>{title}</S.Title>
		</S.Container>
	);
};

export default HeaderPresenter;

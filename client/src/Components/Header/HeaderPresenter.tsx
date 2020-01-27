import React from "react";
import BackArrow from "../BackArrow";
import * as S from "./HeaderStyle";

interface IProps {
	title: string;
	backTo?: string;
	backFn?: () => void;
}

const HeaderPresenter: React.FC<IProps> = ({ title, backTo, backFn }) => {
	return (
		<S.Container>
			{backTo && <BackArrow backTo={backTo} />}
			{backFn && <BackArrow backFn={backFn} />}
			<S.Title>{title}</S.Title>
		</S.Container>
	);
};

export default HeaderPresenter;

import React from "react";
import * as S from "./LabelStyle";

interface IProps {
	label: string;
}

const LabelPresenter: React.FC<IProps> = ({ label }) => {
	return <S.Label>{label}</S.Label>;
};

export default LabelPresenter;

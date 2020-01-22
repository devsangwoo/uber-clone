import React from "react";
import * as S from "./MessageStyle";

interface IProps {
	text: string;
	mine: boolean;
}

const MessagePresenter: React.FC<IProps> = ({ text, mine }) => (
	<S.Container mine={mine}>{text}</S.Container>
);

export default MessagePresenter;

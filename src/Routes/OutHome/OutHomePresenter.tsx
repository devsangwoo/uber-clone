import React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as S from "./OutHomeStyle";
import { useTitle } from "../../hooks";

interface IProps extends RouteComponentProps {}

const OutHomePresenter: React.FC<IProps> = () => {
	useTitle("Login | Nuber");
	return (
		<S.Container>
			<S.Header>
				<S.Logo>
					<S.Title>Nuber</S.Title>
				</S.Logo>
			</S.Header>
			<S.Footer></S.Footer>
			<S.PhoneLoginDiv></S.PhoneLoginDiv>
		</S.Container>
	);
};

OutHomePresenter.propTypes = {};

export default OutHomePresenter;

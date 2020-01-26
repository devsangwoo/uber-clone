import React from "react";
import logo from "../../assets/images/loading.gif";
import * as S from "./LoadingStyle";

interface IProps {}

const LoadingPresenter: React.FC<IProps> = () => {
	return (
		<S.Container>
			<img src="../../assets/images/loading.gif" alt="loading..." />
		</S.Container>
	);
};

export default LoadingPresenter;

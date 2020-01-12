import React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as S from "./HomeStyle";

interface IProps extends RouteComponentProps {}

const HomePresenter: React.FC<IProps> = () => {
	return <div>HomePresenter</div>;
};

HomePresenter.propTypes = {};

export default HomePresenter;

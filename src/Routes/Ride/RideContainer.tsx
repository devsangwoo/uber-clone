import React from "react";
import RidePresenter from "./RidePresenter";
import { RouteComponentProps } from "react-router-dom";

interface IProps extends RouteComponentProps {}
const RideContainer: React.FC<IProps> = ({ location }) => {
	console.log(location);
	return <RidePresenter />;
};

export default RideContainer;

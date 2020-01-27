import { useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import Routes from "..";
import { GetRideHistory, GetRideHistoryVariables } from "../../types/api";
import RideHistoryPresenter from "./RideHistoryPresenter";
import { GET_RIDES_HISTORY } from "./RideHistoryQueries";

interface IProps extends RouteComponentProps {}
const RideHistoryContainer: React.FC<IProps> = ({ history, location }) => {
	if (location.state.isDriver === undefined) {
		history.push(Routes.HOME);
	}

	const [paging, setPaging] = useState(1);
	const [isDriver, setIsDriver] = useState(location.state.isDriver);

	const { data: ridesData, refetch } = useQuery<
		GetRideHistory,
		GetRideHistoryVariables
	>(GET_RIDES_HISTORY, {
		variables: {
			isDriver,
			paging
		}
	});

	const onReachToEnd = () => {
		setPaging(paging + 1);
		refetch();
	};

	return (
		<RideHistoryPresenter
			data={ridesData}
			isDriver={isDriver}
			setIsDriver={setIsDriver}
			onReachToEnd={onReachToEnd}
		/>
	);
};

export default RideHistoryContainer;

import { useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import { GET_CURRENT_USER } from "../../SharedQueries";
import HomePresenter from "./HomePresenter";

interface IProps {}

const HomeContainer: React.FC = () => {
	const { data, loading } = useQuery(GET_CURRENT_USER);
	const [isSideOpen, setIsSideOpen] = useState(false);

	const toggleSideBar = () => {
		setIsSideOpen(!isSideOpen);
	};

	return (
		<HomePresenter
			user={loading ? null : data.GetCurrentUser.user}
			openStatus={isSideOpen}
			toggleSideBar={toggleSideBar}
		/>
	);
};

export default HomeContainer;

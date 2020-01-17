import { useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import { GET_CURRENT_USER } from "../../SharedQueries";
import { GetCurrentUser } from "../../types/api";
import HomePresenter from "./HomePresenter";

interface IProps {}

const HomeContainer: React.FC = () => {
	const { data, loading } = useQuery<GetCurrentUser>(GET_CURRENT_USER, {
		fetchPolicy: "network-only"
	});

	const [isSideOpen, setIsSideOpen] = useState(false);
	if (loading) {
		return <div>hello</div>;
	}

	const toggleSideBar = () => {
		setIsSideOpen(!isSideOpen);
	};

	return (
		<HomePresenter openStatus={isSideOpen} toggleSideBar={toggleSideBar} />
	);
};

export default HomeContainer;

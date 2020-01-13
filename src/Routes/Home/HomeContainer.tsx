import { useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import HomePresenter from "./HomePresenter";
import { GET_CURRENT_USER } from "./HomeQueries";

interface IProps {}

const HomeContainer: React.FC = () => {
	const { data } = useQuery(GET_CURRENT_USER);
	console.log(data);
	const [isSideOpen, setIsSideOpen] = useState(false);

	const toggleSideBar = () => {
		setIsSideOpen(!isSideOpen);
	};

	return (
		<HomePresenter openStatus={isSideOpen} toggleSideBar={toggleSideBar} />
	);
};

export default HomeContainer;

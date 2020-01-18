import { useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import { GET_CURRENT_USER } from "../../SharedQueries";
import { GetCurrentUser } from "../../types/api";
import { useInput } from "../../utils/hooks";
import HomePresenter from "./HomePresenter";

interface IProps {}

const HomeContainer: React.FC = () => {
	const { data, loading } = useQuery<GetCurrentUser>(GET_CURRENT_USER, {
		fetchPolicy: "network-only"
	});
	const [isSideOpen, setIsSideOpen] = useState(false);
	const [address, onChangeAddress] = useInput("");

	return (
		<HomePresenter
			openStatus={isSideOpen}
			toggleSideBar={() => setIsSideOpen(!isSideOpen)}
			address={address}
			onInputChange={onChangeAddress}
		/>
	);
};

export default HomeContainer;

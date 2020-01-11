import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { IS_LOGGED_IN } from "./AppQueries";
import AppPresenter from "./AppPresenter";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";

const AppContainer: React.FC = () => {
	const { loading, error, data } = useQuery(IS_LOGGED_IN);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	console.log(data);

	return (
		<ThemeProvider theme={theme}>
			<AppPresenter isLoggedIn={data.auth.isLoggedIn} />
		</ThemeProvider>
	);
};

export default AppContainer;

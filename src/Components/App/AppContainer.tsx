import { useQuery } from "@apollo/react-hooks";
import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import AppPresenter from "./AppPresenter";
import { IS_LOGGED_IN } from "./AppQueries.local";

const AppContainer: React.FC = () => {
	const { loading, error, data } = useQuery(IS_LOGGED_IN);

	if (loading) {
		return <p>Loading...</p>;
	}
	if (error) {
		return <p>Error :(</p>;
	}

	console.log(data);

	return (
		<Fragment>
			<ThemeProvider theme={theme}>
				<AppPresenter isLoggedIn={data.auth.isLoggedIn} />
			</ThemeProvider>
			<ToastContainer draggable={true} position={"bottom-center"} />
		</Fragment>
	);
};

export default AppContainer;

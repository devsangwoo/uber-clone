import { useQuery } from "@apollo/react-hooks";
import React, { Fragment, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { ThemeProvider } from "styled-components";
import { GET_CURRENT_USER } from "../../SharedQueries";
import { theme } from "../../theme";
import { GetCurrentUser } from "../../types/api";
import AppPresenter from "./AppPresenter";
import { IS_LOGGED_IN } from "./AppQueries.local";

const AppContainer: React.FC = () => {
	const { data } = useQuery(IS_LOGGED_IN);

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

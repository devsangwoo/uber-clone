import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./apollo";
import GlobalStyle from "./globalStyle";

ReactDOM.render(
	<ApolloProvider client={client}>
		<GlobalStyle />
		<App />
	</ApolloProvider>,
	document.getElementById("root")
);

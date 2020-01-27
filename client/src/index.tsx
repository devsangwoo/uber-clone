import { ApolloProvider } from "@apollo/react-hooks";
import React from "react";
import ReactDOM from "react-dom";
import client from "./apollo";
import App from "./Components/App";
import GlobalStyle from "./globalStyle";

ReactDOM.render(
	<ApolloProvider client={client}>
		<GlobalStyle />
		<App />
	</ApolloProvider>,
	document.getElementById("root")
);

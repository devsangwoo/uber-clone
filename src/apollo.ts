// import { InMemoryCache } from "apollo-cache-inmemory";
// import { ApolloClient } from "apollo-client";
// import { ApolloLink, concat, Operation, split } from "apollo-link";
// import { onError } from "apollo-link-error";
// import { HttpLink } from "apollo-link-http";
// import { withClientState } from "apollo-link-state";
// import { WebSocketLink } from "apollo-link-ws";
// import { getMainDefinition } from "apollo-utilities";
// import { toast } from "react-toastify";

// // localstroage ->  sessionStorage
// // b/c shared local storage between incognito and not
// const getToken = () => {
// 	const token = sessionStorage.getItem("jwt");
// 	if (token) {
// 		return token;
// 	} else {
// 		return "";
// 	}
// };

// const cache = new InMemoryCache();

// const wsLink = new WebSocketLink({
// 	options: {
// 		connectionParams: {
// 			"X-JWT": getToken()
// 		},
// 		reconnect: true
// 	},
// 	uri: "ws://localhost:4000/subscription"
// });

// const httpLink = new HttpLink({
// 	uri: "http://localhost:4000/graphql"
// });

// const combinedLinks = split(
// 	// split based on operation type
// 	({ query }) => {
// 		const definition = getMainDefinition(query);
// 		return (
// 			definition.kind === "OperationDefinition" &&
// 			definition.operation === "subscription"
// 		);
// 	},
// 	wsLink,
// 	httpLink
// );

// const AUTH = "Auth";

// const localStateLink = withClientState({
// 	cache,
// 	defaults: {
// 		auth: {
// 			__typename: AUTH,
// 			isLoggedIn: Boolean(getToken())
// 		}
// 	},
// 	resolvers: {
// 		Mutation: {
// 			userLogIn: (_: any, { token }: any, { cache: appCache }: any) => {
// 				sessionStorage.setItem("X-JWT", token);
// 				appCache.writeData({
// 					data: {
// 						auth: {
// 							__typename: AUTH,
// 							isLoggedIn: true
// 						}
// 					}
// 				});
// 			},
// 			userLogOut: (_: any, __: any, { cache: appCache }: any) => {
// 				sessionStorage.removeItem("X-JWT");
// 				appCache.writeData({
// 					data: {
// 						auth: {
// 							__typename: AUTH,
// 							isLoggedIn: false
// 						}
// 					}
// 				});
// 			}
// 		}
// 	}
// });

// const authMiddleware = new ApolloLink((operation: Operation, forward: any) => {
// 	operation.setContext({
// 		headers: {
// 			"X-JWT": getToken()
// 		}
// 	});
// 	return forward(operation);
// });

// const errorLink = onError(({ graphQLErrors, networkError }) => {
// 	if (graphQLErrors) {
// 		graphQLErrors.map(({ message }) => {
// 			toast.error(`Unexpected error: ${message}`);
// 		});
// 	}
// 	if (networkError) {
// 		toast.error(`Network error: ${networkError}`);
// 	}
// });

// const client = new ApolloClient({
// 	cache,
// 	link: ApolloLink.from([
// 		errorLink,
// 		localStateLink,
// 		concat(authMiddleware, combinedLinks)
// 	])
// });

// export default client;
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink, concat, Operation, split } from "apollo-link";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import { withClientState } from "apollo-link-state";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { toast } from "react-toastify";

const isDev = process.env.NODE_ENV === "development";
// console.log(isDev);

const getToken = () => {
	const token = sessionStorage.getItem("X-JWT");
	if (token) {
		return token;
	} else {
		return "";
	}
};

const cache = new InMemoryCache();

const authMiddleware = new ApolloLink((operation: Operation, forward: any) => {
	operation.setContext({
		headers: {
			"X-JWT": getToken()
		}
	});
	return forward(operation);
});

const httpLink = new HttpLink({
	uri: isDev
		? "http://localhost:4000/graphql"
		: "https://nuberserver.now.sh/graphql"
});

const wsLink = new WebSocketLink({
	options: {
		connectionParams: {
			"X-JWT": getToken()
		},
		reconnect: true
	},
	uri: isDev
		? "ws://localhost:4000/subscription"
		: "ws://nuberserver.now.sh/subscription"
});

const combinedLinks = split(
	({ query }) => {
		const { kind, operation }: any = getMainDefinition(query);
		return kind === "OperationDefinition" && operation === "subscription";
	},
	wsLink,
	httpLink
);

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.map(({ message }) => {
			toast.error(`Unexpected error: ${message}`);
		});
	}
	if (networkError) {
		toast.error(`Network error: ${networkError}`);
	}
});

const localStateLink = withClientState({
	cache,
	defaults: {
		auth: {
			__typename: "Auth",
			isLoggedIn: Boolean(sessionStorage.getItem("X-JWT"))
		}
	},
	resolvers: {
		Mutation: {
			userLogIn: (_: any, { token }: any, { cache: appCache }: any) => {
				sessionStorage.setItem("X-JWT", token);
				appCache.writeData({
					data: {
						auth: {
							__typename: "Auth",
							isLoggedIn: true
						}
					}
				});
				return null;
			},
			userLogOut: (_: any, __: any, { cache: appCache }: any) => {
				sessionStorage.removeItem("X-JWT");
				appCache.writeData({
					data: {
						auth: {
							__typename: "Auth",
							isLoggedIn: false
						}
					}
				});
				return null;
			}
		}
<<<<<<< HEAD
	},
	request: async (operation: Operation) => {
		operation.setContext({
			headers: {
				"X-JWT": sessionStorage.getItem("X-JWT") || ""
			}
		});
	},
<<<<<<< HEAD
<<<<<<< HEAD
	uri: "http://localhost:4000/graphql"
=======
	uri: "https://localhost:4000/graphql"
>>>>>>> 37ade45... [#1] dev env setting
=======
	uri: "http://localhost:4000/graphql"
>>>>>>> 58f39ad... [#1] router enviroment setting
=======
	}
});

const client = new ApolloClient({
	cache,
	link: ApolloLink.from([
		errorLink,
		localStateLink,
		concat(authMiddleware, combinedLinks)
	])
>>>>>>> 428caad... [#4]subscription setting
});

export default client;

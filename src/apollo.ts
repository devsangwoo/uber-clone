import ApolloClient, { Operation } from "apollo-boost";

const AUTH = "Auth";
const client = new ApolloClient({
	clientState: {
		defaults: {
			auth: {
				__typename: AUTH,
				isLoggedIn: Boolean(localStorage.getItem("X-JWT"))
			}
		},
		resolvers: {
			Mutation: {
				userLogIn: (_, { jwt }, { cache }) => {
					localStorage.setItem("X-JWT", jwt);
					cache.writeData({
						auth: {
							__typename: AUTH,
							isLoggedIn: true
						}
					});
				},
				userLogOut: (_, __, { cache }) => {
					localStorage.removeItem("X-JWT");
					cache.writeData({
						auth: {
							__typename: AUTH,
							isLoggedIn: false
						}
					});
				}
			}
		}
	},
	request: async (operation: Operation) => {
		operation.setContext({
			header: {
				"X-JWT": localStorage.getItem("X-JWT") || ""
			}
		});
	},
	uri: "http://localhost:4000/graphql"
});

export default client;

// import ApolloClient, { Operation } from "apollo-boost";

// const AUTH = "Auth";
// const client = new ApolloClient({
// 	clientState: {
// 		defaults: {
// 			auth: {
// 				__typename: AUTH,
// 				isLoggedIn: Boolean(localStorage.getItem("X-JWT"))
// 			}
// 		},
// 		resolvers: {
// 			Mutation: {
// 				logUserIn: (_, { jwt }, { cache }) => {
// 					localStorage.setItem("X-JWT", jwt);
// 					cache.writeData({
// 						data: {
// 							auth: {
// 								__typename: AUTH,
// 								isLoggedIn: true
// 							}
// 						}
// 					});
// 				},
// 				logUserOUt: (_, __, { cache }) => {
// 					localStorage.removeItem("X-JWT");
// 					cache.writeData({
// 						data: {
// 							__typename: AUTH,
// 							isLoggedIn: false
// 						}
// 					});
// 					return null;
// 				}
// 			}
// 		}
// 	},
// 	// configure header
// 	request: async (operation: Operation) => {
// 		operation.setContext({
// 			header: {
// 				"X-JWT": localStorage.getItem("X-JWT") || ""
// 			}
// 		});
// 	},
// 	uri: "http://localhost:4000/graphql"
// });

// export default client;

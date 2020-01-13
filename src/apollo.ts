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
				userLogIn: (_, { token }, { cache }) => {
					localStorage.setItem("X-JWT", token);
					cache.writeData({
						data: {
							auth: {
								__typename: AUTH,
								isLoggedIn: true
							}
						}
					});
				},
				userLogOut: (_, __, { cache }) => {
					localStorage.removeItem("X-JWT");
					cache.writeData({
						data: {
							auth: {
								__typename: AUTH,
								isLoggedIn: false
							}
						}
					});
				}
			}
		}
	},
	request: async (operation: Operation) => {
		operation.setContext({
			headers: {
				"X-JWT": localStorage.getItem("X-JWT") || ""
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
});

export default client;

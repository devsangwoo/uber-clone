import { gql } from "apollo-boost";

export const IS_LOGGED_IN = gql`
	query {
		auth {
			isLoggedIn @client
		}
	}
`;

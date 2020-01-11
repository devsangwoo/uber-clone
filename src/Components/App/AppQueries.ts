import { gql } from "apollo-boost";

export const IS_LOGGED_IN = gql`
	query {
		auth {
			isLoggedIn @client
		}
	}
`;

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 58f39ad... [#1] router enviroment setting
export const GET_CURRENT_USER = gql`
	query {
		GetCurrentUser {
			res
			error
			user {
				fullName
			}
		}
	}
`;

<<<<<<< HEAD
=======
>>>>>>> 37ade45... [#1] dev env setting
=======
>>>>>>> 58f39ad... [#1] router enviroment setting
export const USER_LOG_OUT = gql`
	mutation logOut {
		userLogOut @client
	}
`;

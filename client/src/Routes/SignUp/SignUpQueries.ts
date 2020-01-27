import { gql } from "apollo-boost";

export const EMAIL_SIGN_UP = gql`
	mutation EmailSignUp(
		$firstName: String!
		$lastName: String!
		$email: String!
		$password: String!
		$phoneNumber: String!
	) {
		EmailSignUp(
			firstName: $firstName
			lastName: $lastName
			email: $email
			password: $password
			phoneNumber: $phoneNumber
		) {
			res
			error
			token
		}
	}
`;

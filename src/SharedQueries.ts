import { gql } from "apollo-boost";

export const GET_CURRENT_USER = gql`
	query GetCurrentUser {
		GetCurrentUser {
			res
			error
			user {
				firstName
				lastName
				fullName
				isDriving
				email
				verifiedEmail
				lastName
				phoneNumber
				verifiedPhoneNumber
				profilePhoto
			}
		}
	}
`;

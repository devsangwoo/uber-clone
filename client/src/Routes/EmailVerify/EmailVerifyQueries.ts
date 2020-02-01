import { gql } from "apollo-boost";

export const VALIDATE_EAMIL_VERIFICATION = gql`
	mutation ValidateEmailVerification($key: String!) {
		ValidateEmailVerification(key: $key) {
			res
			error
		}
	}
`;

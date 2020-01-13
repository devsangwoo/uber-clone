import { gql } from "apollo-boost";

export const VALIDATE_PHONE_VERIFICATION = gql`
	mutation ValidatePhoneVerification($phoneNumber: String!, $key: String!) {
		ValidatePhoneVerification(phoneNumber: $phoneNumber, key: $key) {
			res
			error
			token
		}
	}
`;

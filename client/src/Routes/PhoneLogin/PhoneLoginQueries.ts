import { gql } from "apollo-boost";

export const VERIFY_PHONE = gql`
	mutation PhoneVerification($phoneNumber: String!) {
		PhoneVerification(phoneNumber: $phoneNumber) {
			res
			error
		}
	}
`;

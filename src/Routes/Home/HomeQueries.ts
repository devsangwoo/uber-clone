import { gql } from "apollo-boost";

export const REPORT_MOVEMENT = gql`
	mutation ReportMovement($lastLng: Float!, $lastLat: Float!) {
		ReportMovement(lastLng: $lastLng, lastLat: $lastLat) {
			res
			error
		}
	}
`;

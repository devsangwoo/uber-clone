import { gql } from "apollo-boost";

export const GET_RIDES_HISTORY = gql`
	query GetRideHistory($isDriver: Boolean!, $paging: Int!) {
		GetRideHistory(isDriver: $isDriver, paging: $paging) {
			res
			error
			rides {
				pickUpAddress
				dropOffAddress
				price
				updateAt
				pickUpLat
				pickUpLng
				dropOffLat
				dropOffLng
				status
			}
		}
	}
`;

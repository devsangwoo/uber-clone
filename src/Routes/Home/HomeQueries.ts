import { gql } from "apollo-boost";

export const REPORT_MOVEMENT = gql`
	mutation ReportMovement($lastLng: Float!, $lastLat: Float!) {
		ReportMovement(lastLng: $lastLng, lastLat: $lastLat) {
			res
			error
		}
	}
`;

export const REQUEST_RIDE = gql`
	mutation RequestRide(
		$pickUpAddress: String!
		$pickUpLat: Float!
		$pickUpLng: Float!
		$dropOffAddress: String!
		$dropOffLat: Float!
		$dropOffLng: Float!
		$duration: String!
		$distance: String!
		$price: Float!
	) {
		RequestRide(
			pickUpAddress: $pickUpAddress
			pickUpLat: $pickUpLat
			pickUpLng: $pickUpLng
			dropOffAddress: $dropOffAddress
			dropOffLat: $dropOffLat
			dropOffLng: $dropOffLng
			duration: $duration
			distance: $distance
			price: $price
		) {
			res
			error
			ride {
				id
			}
		}
	}
`;

export const GET_NEARBY_DRIVERS = gql`
	query GetNearbyDrivers {
		GetNearbyDrivers {
			res
			error
			drivers {
				id
				fullName
				profilePhoto
			}
		}
	}
`;

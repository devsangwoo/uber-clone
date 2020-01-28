import { gql } from "apollo-boost";

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
		$rideImage: String!
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
			rideImage: $rideImage
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
				lastLat
				lastLng
			}
		}
	}
`;

export const GET_RIDE_BY_ID = gql`
	query GetRideById($rideId: Int!) {
		GetRideById(rideId: $rideId) {
			res
			error
			ride {
				id
				status
			}
		}
	}
`;

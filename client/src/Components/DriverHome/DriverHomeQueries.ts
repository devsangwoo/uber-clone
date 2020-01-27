import { gql } from "apollo-boost";

export const GET_NEARBY_RIDES = gql`
	query GetNearbyRides {
		GetNearbyRides {
			res
			error
			rides {
				id
				pickUpAddress
				pickUpLat
				pickUpLng
				dropOffAddress
				dropOffLat
				dropOffLng
				price
				distance
				duration
			}
		}
	}
`;

export const RIDE_SUBSCRIPTION = gql`
	subscription RideSubscription {
		RideSubscription {
			id
			pickUpAddress
			pickUpLat
			pickUpLng
			dropOffAddress
			dropOffLat
			dropOffLng
			price
			distance
			duration
		}
	}
`;

export const TAKE_REQUESTED_RIDE = gql`
	mutation TakeRequestedRide($rideId: Int!) {
		TakeRequestedRide(rideId: $rideId) {
			res
			error
		}
	}
`;

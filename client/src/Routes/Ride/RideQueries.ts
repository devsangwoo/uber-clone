import { gql } from "apollo-boost";

export const GET_RIDE_BY_ID_RIDE = gql`
	query GetRideByIdRide($rideId: Int!) {
		GetRideById(rideId: $rideId) {
			res
			error
			ride {
				id
				status
				pickUpAddress
				pickUpLat
				pickUpLng
				dropOffAddress
				dropOffLat
				dropOffLng
				price
				distance
				duration
				driver {
					id
					fullName
					profilePhoto
					phoneNumber
				}
				passenger {
					id
					fullName
					profilePhoto
					phoneNumber
				}
				chatId
			}
		}
	}
`;

export const RIDE_STATUS_SUBSCRIPTION = gql`
	subscription MessageSubscription {
		MessageSubscription {
			text
			userId
		}
	}
`;

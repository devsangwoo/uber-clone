import { withFilter } from "graphql-yoga";
import { RANGE_0_5, REQUESTED, RIDE_REQUEST } from "../../../constants";
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";

const resolvers = {
	Subscription: {
		RideSubscription: {
			subscribe: withFilter(
				(_, __, { pubSub }) => {
					return pubSub.asyncIterator(RIDE_REQUEST);
				},
				(payload, _, { context }) => {
					const driver: User = context.currentUser;
					const ride: Ride = payload.RideSubscription;
					if (!driver.isDriving) {
						return false;
					}

					const {
						lastLat: driverLastLat,
						lastLng: driverLastLng
					} = driver;
					const { pickUpLat, pickUpLng, status } = ride;
					return (
						status === REQUESTED &&
						pickUpLat >= driverLastLat - RANGE_0_5 &&
						pickUpLat <= driverLastLat + RANGE_0_5 &&
						pickUpLng >= driverLastLng - RANGE_0_5 &&
						pickUpLng <= driverLastLng + RANGE_0_5
					);
				}
			)
		}
	}
};

export default resolvers;

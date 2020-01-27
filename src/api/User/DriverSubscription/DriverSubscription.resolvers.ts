import { withFilter } from "graphql-yoga";
import { DRIVER_UPDATE, RANGE_0_5 } from "../../../constants";
import User from "../../../entities/User";

const resolvers = {
	Subscription: {
		DriverSubscription: {
			subscribe: withFilter(
				(_, __, { pubSub }) => {
					return pubSub.asyncIterator(DRIVER_UPDATE);
				},
				(payload, _, { context }) => {
					const user: User = context.currentUser;
					const driver: User = payload.DriverSubscription;
					if (!driver.isDriving) {
						return false;
					}

					const {
						lastLat: driverLastLat,
						lastLng: driverLastLng
					} = driver;
					const { lastLat: userLastLat, lastLng: userLastLng } = user;
					return (
						driverLastLat >= userLastLat - RANGE_0_5 &&
						driverLastLat <= userLastLat + RANGE_0_5 &&
						driverLastLng >= userLastLng - RANGE_0_5 &&
						driverLastLng <= userLastLng + RANGE_0_5
					);
				}
			)
		}
	}
};

export default resolvers;

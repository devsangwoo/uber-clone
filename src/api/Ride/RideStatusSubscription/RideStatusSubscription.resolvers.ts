import { withFilter } from "graphql-yoga";
import { UPDATE_RIDE_STATUS } from "../../../constants";
import User from "../../../entities/User";

const resolvers = {
	Subscription: {
		RideStatusSubscription: {
			subscribe: withFilter(
				(_, __, { pubSub }) => {
					return pubSub.asyncIterator(UPDATE_RIDE_STATUS);
				},
				(payload, _, { context }) => {
					const user: User = context.currentUser;

					const { passengerId, driverId } = payload; // why need passenger id?
					console.log(user);
					console.log(`payload:`, payload);
					return user.id === passengerId || user.id === driverId;
				}
			)
		}
	}
};

export default resolvers;

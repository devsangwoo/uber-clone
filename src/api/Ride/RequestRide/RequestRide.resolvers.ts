import { RIDE_REQUEST } from "../../../constants";
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import {
	RequestRideMutationArgs,
	RequestRideResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authResolverProtector } from "../../../utils/resolverProtector";

const resolvers: Resolvers = {
	Mutation: {
		RequestRide: authResolverProtector(
			async (
				_,
				args: RequestRideMutationArgs,
				{ req, pubSub }
			): Promise<RequestRideResponse> => {
				const user: User = req.user;
				if (user.currentRideId) {
					return {
						res: false,
						error: `You are "already on route now`,
						ride: null
					};
				}

				if (user.isDriving) {
					return {
						res: false,
						error: "you are a driver",
						ride: null
					};
				}

				try {
					const existedRide = await Ride.findOne({
						...args,
						passenger: user
					});
					if (existedRide) {
						existedRide.remove();
					}
					const ride = await Ride.create({
						...args,
						passenger: user
					}).save();
					await User.update({ id: user.id }, { currentRide: ride });
					pubSub.publish(RIDE_REQUEST, {
						RideSubscription: ride
					});
					return {
						res: true,
						error: null,
						ride
					};
				} catch (error) {
					return {
						res: false,
						error: error.message,
						ride: null
					};
				}
			}
		)
	}
};

export default resolvers;

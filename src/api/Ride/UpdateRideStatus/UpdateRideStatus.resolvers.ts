import { CANCELED, FINISHED, UPDATE_RIDE_STATUS } from "../../../constants";
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import {
	UpdateRideStatusMutationArgs,
	UpdateRideStatusResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authResolverProtector } from "../../../utils/resolverProtector";

const resolvers: Resolvers = {
	Mutation: {
		UpdateRideStatus: authResolverProtector(
			async (
				_,
				args: UpdateRideStatusMutationArgs,
				{ req, pubSub }
			): Promise<UpdateRideStatusResponse> => {
				const user: User = req.user;
				try {
					// too vague update -> should be more concise
					const ride = await Ride.findOne(
						{ id: args.rideId },
						{ relations: ["passenger", "driver"] }
					);
					if (ride) {
						if (
							ride.passengerId === user.id ||
							ride.driverId === user.id
						) {
							// if finish, canceled-> should change driver and passenger's isTaken as false
							ride.status = args.status;
							if (
								args.status === FINISHED ||
								args.status === CANCELED
							) {
								await User.update(
									{ id: ride.passengerId },
									{ currentRide: undefined }
								);
								await User.update(
									{ id: ride.driverId },
									{ currentRide: undefined }
								);
							}
							ride.save();
							pubSub.publish(UPDATE_RIDE_STATUS, {
								RideStatusSubscription: ride
							});
							return {
								res: true,
								error: null
							};
						} else {
							return {
								res: false,
								error: "Not authrorized person to update ride"
							};
						}
					} else {
						return {
							res: false,
							error: "no ride has been found"
						};
					}
				} catch (error) {
					return {
						res: false,
						error: error.message
					};
				}
			}
		)
	}
};

export default resolvers;

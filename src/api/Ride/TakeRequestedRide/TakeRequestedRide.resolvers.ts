import { ACCEPTED, REQUESTED } from "../../../constants";
import Chat from "../../../entities/Chat";
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import {
	TakeRequestedRideMutationArgs,
	TakeRequestedRideResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authResolverProtector } from "../../../utils/resolverProtector";

const resolvers: Resolvers = {
	Mutation: {
		TakeRequestedRide: authResolverProtector(
			async (
				_,
				args: TakeRequestedRideMutationArgs,
				{ req }
			): Promise<TakeRequestedRideResponse> => {
				const driver: User = req.user;
				if (driver.isDriving) {
					if (driver.currentRide) {
						return {
							res: false,
							error:
								"You already have a ride to take your passenger to dropoff address"
						};
					}
					try {
						const requestedRide = await Ride.findOne(
							{
								id: args.rideId
							},
							{ relations: ["passenger"] }
						);
						if (
							requestedRide &&
							requestedRide.status === REQUESTED
						) {
							// requestedRide.driver = driver;
							const passenger = await User.findOne({
								id: requestedRide.passenger.id
							});
							if (passenger) {
								passenger.currentRide = requestedRide; // test
								passenger.save();
							}
							driver.currentRide = requestedRide; // test
							driver.save();
							const chat = await Chat.create({
								driver,
								passenger: requestedRide.passenger,
								ride: requestedRide
							}).save();
							await Ride.update(
								{
									id: requestedRide.id
								},
								{
									chat,
									driver,
									status: ACCEPTED
								}
							);
							return {
								res: true,
								error: null
							};
						} else {
							return {
								res: false,
								error: "Non existed Ride anymore"
							};
						}
					} catch (error) {
						return {
							res: false,
							error: error.message
						};
					}
				} else {
					return {
						res: false,
						error: "You are not a driver"
					};
				}
				// if it's not driver -> rf

				// take -> then update requested ride to accepted
				// update -> ride(status, driver),
			}
		)
	}
};

export default resolvers;

import Ride from "../../../entities/Ride";
import {
	GetRideByIdQueryArgs,
	GetRideByIdResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authResolverProtector } from "../../../utils/resolverProtector";

const resolvers: Resolvers = {
	Query: {
		GetRideById: authResolverProtector(
			async (
				_,
				args: GetRideByIdQueryArgs,
				{ req }
			): Promise<GetRideByIdResponse> => {
				try {
					const ride = await Ride.findOne(
						{ id: args.rideId },
						{ relations: ["driver", "passenger"] }
					);
					if (ride) {
						return {
							res: true,
							error: null,
							ride
						};
					}
					return {
						res: false,
						error: "not existed ride",
						ride: null
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
